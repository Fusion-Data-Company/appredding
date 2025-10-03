"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Phone, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface BGPatternProps extends React.ComponentProps<'div'> {
  variant?: 'dots' | 'grid';
  mask?: 'fade-edges' | 'fade-bottom' | 'none';
  size?: number;
  fill?: string;
}

const BGPattern: React.FC<BGPatternProps> = ({
  variant = 'grid',
  mask = 'fade-bottom',
  size = 24,
  fill = 'rgba(59, 130, 246, 0.15)',
  className,
  style,
  ...props
}) => {
  const maskClasses = {
    'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
    'fade-bottom': '[mask-image:linear-gradient(to_bottom,var(--background),transparent)]',
    'none': '',
  };

  const bgImage = variant === 'dots'
    ? `radial-gradient(${fill} 1px, transparent 1px)`
    : `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;

  return (
    <div
      className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
      style={{
        backgroundImage: bgImage,
        backgroundSize: `${size}px ${size}px`,
        ...style,
      }}
      {...props}
    />
  );
};

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href = '#', children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200"
  >
    {children}
  </a>
);

const SolarCompanyHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services', hasDropdown: true },
    { title: 'Residential', href: '/residential' },
    { title: 'Repairs', href: '/repairs' },
    { title: 'Commerce', href: '/commerce' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  const services = [
    { title: 'Residential Solar', href: '/residential' },
    { title: 'Commercial Solar', href: '/commercial' },
    { title: 'Solar Repairs', href: '/repairs' },
    { title: 'Energy Storage', href: '/storage' },
  ];

  return (
    <motion.header
      initial={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
      animate={{
        backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)',
        borderBottomColor: isScrolled ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)',
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
    >
      <nav className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Advance Power</h1>
              <p className="text-xs text-blue-300">Redding Solar</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.hasDropdown ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent text-blue-100 hover:text-white">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4">
                            {services.map((service) => (
                              <li key={service.title}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={service.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-950/50 hover:text-white"
                                  >
                                    <div className="text-sm font-medium leading-none">{service.title}</div>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <a href={item.href} className="text-blue-100 hover:text-white px-3 py-2 text-sm font-medium">
                          {item.title}
                        </a>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
            >
              Get Quote
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Emergency: </span>
              <span className="font-semibold">(530) 226-0701</span>
            </Button>
          </div>

          <button
            className="md:hidden text-blue-100 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-blue-900/30"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <NavLink href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.title}
                  </NavLink>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {services.map((service) => (
                        <NavLink
                          key={service.title}
                          href={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-sm text-blue-300">{service.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full border-blue-500 text-blue-400">
                  Get Quote
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Emergency: (530) 226-0701
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default SolarCompanyHeader;
