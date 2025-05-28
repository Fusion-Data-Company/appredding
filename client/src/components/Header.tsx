import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher";
import { Sun, Moon, ChevronDown, Shield, ShieldCheck, Flame, LifeBuoy, Building2, Home, BriefcaseBusiness, BarChart4, PaintBucket, HardHat, Settings, Wrench } from "lucide-react";
import solarLogo from "@assets/Untitled design (6).png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [location] = useLocation();
  const isHomePage = location === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`relative dark:bg-[#080c14]/95 backdrop-blur-xl border-b dark:border-[#ff6a00]/20 border-gray-300 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "dark:shadow-[0_4px_20px_rgba(255,106,0,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-3" : "py-5"
      } h-24 flex items-center`}
    >
      {/* Premium header ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-600/10 rounded-full filter blur-3xl opacity-70"></div>
      </div>
      
      {/* Animated accent lines */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      <div className="absolute left-0 top-0 h-px w-[40%] bg-gradient-to-r from-transparent to-orange-500/30"></div>
      <div className="absolute right-0 top-0 h-px w-[40%] bg-gradient-to-l from-transparent to-blue-500/30"></div>
      
      <div className="w-[95%] mx-auto px-4 flex justify-between items-center relative z-10">
        <Link href="/" className="text-4xl font-heading font-bold flex items-center gap-3 group z-10">
          <div className="relative group">
            {/* Enhanced glow effects for logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-blue-500/30 filter blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 filter blur-lg rounded-full"></div>
            <img 
              src={solarLogo} 
              alt="Advance Power Solar" 
              className="h-12 w-auto relative z-10 transition-all duration-300 hover:scale-105 filter drop-shadow-lg"
            />
          </div>
          <div className="tracking-tight flex items-center">
            <div className="text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] leading-none whitespace-nowrap">
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent font-bold">Advance Power</span>
              <span className="text-white/90 mx-1 font-light">|</span>
              <span className="gradient-text-blue font-medium">Redding</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-end ml-auto pr-10">
          <div className="flex items-center mr-10">
            <div className="relative pl-3 mr-3">
              <Sun size={22} className="absolute -left-8 bottom-2 text-yellow-500 dark:text-yellow-400" />
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.3)] backdrop-blur-sm px-1 border border-gray-700/40">
                  <LightPullThemeSwitcher />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <ChevronDown size={16} className="text-orange-400 animate-bounce" />
                </div>
              </div>
              <Moon size={22} className="absolute -right-8 bottom-2 text-blue-500 dark:text-blue-400" />
            </div>
          </div>
          
          {/* Premium menu styling */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/5 via-blue-500/5 to-orange-500/5 rounded-lg blur-sm"></div>
            <Menu setActive={setActiveItem}>
              <MenuItem setActive={setActiveItem} active={activeItem} item="Solar Solutions">
                <div className="grid grid-cols-2 gap-4 p-4 w-[500px]">
                  <div className="col-span-2 mb-2 pb-2 border-b border-gray-700/30">
                    <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Solar Energy Solutions</h3>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-red-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-red-900/30 text-red-400">
                      <Home size={18} />
                    </div>
                    <HoveredLink href="/residential-solar" className="text-left">Residential Solar</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-yellow-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-yellow-900/30 text-yellow-400">
                      <Building2 size={18} />
                    </div>
                    <HoveredLink href="/commercial-solar" className="text-left">Commercial Solar</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-green-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-green-900/30 text-green-400">
                      <Settings size={18} />
                    </div>
                    <HoveredLink href="/solar-maintenance" className="text-left">Solar Maintenance</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-blue-900/30 text-blue-400">
                      <Shield size={18} />
                    </div>
                    <HoveredLink href="/battery-storage" className="text-left">Battery Storage</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-red-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-red-900/30 text-red-400">
                      <BarChart4 size={18} />
                    </div>
                    <HoveredLink href="/energy-monitoring" className="text-left">Energy Monitoring</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-yellow-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-yellow-900/30 text-yellow-400">
                      <Wrench size={18} />
                    </div>
                    <HoveredLink href="/solar-repairs" className="text-left">Solar Repairs</HoveredLink>
                  </div>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActiveItem} active={activeItem} item="About">
                <div className="flex flex-col space-y-1 p-4 w-[280px]">
                  <div className="mb-2 pb-2 border-b border-gray-700/30">
                    <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Company Information</h3>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-blue-900/30 text-blue-400">
                      <Building2 size={18} />
                    </div>
                    <HoveredLink href="/about" className="text-left">Company</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-blue-900/30 text-blue-400">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <HoveredLink href="/team" className="text-left">Team</HoveredLink>
                  </div>
                  
                  {isHomePage ? (
                    <a 
                      href="#contact" 
                      className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors"
                    >
                      <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                        <LifeBuoy size={18} />
                      </div>
                      <span className="gradient-text-fire font-medium text-base">Contact Us</span>
                    </a>
                  ) : (
                    <Link
                      href="/#contact"
                      className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors"
                    >
                      <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                        <LifeBuoy size={18} />
                      </div>
                      <span className="gradient-text-fire font-medium text-base">Contact Us</span>
                    </Link>
                  )}
                  
                  <div className="pt-2 mt-2 border-t border-gray-700/30">
                    <Link
                      href="/style-showcase"
                      className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                    >
                      <div className="p-2 rounded-full bg-gradient-to-r from-orange-900/30 to-blue-900/30 text-white">
                        <Shield size={18} />
                      </div>
                      <span className="gradient-text-combined font-medium text-base">Style Showcase</span>
                    </Link>
                  </div>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActiveItem} active={activeItem} item="Business Tools">
                <div className="flex gap-6 p-4 w-[550px]">
                  <div className="w-1/2">
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Business Operations</h3>
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="relative overflow-hidden rounded-lg border border-red-900/30 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-yellow-900/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 w-full h-28 flex items-center justify-center overflow-hidden">
                          <BriefcaseBusiness size={36} className="text-red-500" />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/90 to-transparent">
                          <h4 className="text-white font-bold text-sm">CRM Dashboard</h4>
                          <p className="text-gray-300 text-xs">Customer relationship management</p>
                          <Link href="/crm" className="absolute inset-0">
                            <span className="sr-only">CRM Dashboard</span>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="relative overflow-hidden rounded-lg border border-yellow-900/30 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-green-900/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 w-full h-28 flex items-center justify-center overflow-hidden">
                          <BarChart4 size={36} className="text-yellow-500" />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/90 to-transparent">
                          <h4 className="text-white font-bold text-sm">Analytics</h4>
                          <p className="text-gray-300 text-xs">Business intelligence & reporting</p>
                          <Link href="/analytics" className="absolute inset-0">
                            <span className="sr-only">Analytics Dashboard</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-1/2">
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider">Tools & Services</h3>
                    </div>
                    
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 hover:bg-green-900/20 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-md bg-green-900/20 flex items-center justify-center">
                          <Settings className="text-green-500 w-6 h-6" />
                          <div className="absolute inset-0 border border-green-900/30 rounded-md"></div>
                        </div>
                        <HoveredLink href="/financial-center" className="text-left">Financial Center</HoveredLink>
                      </div>
                      
                      <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-md bg-blue-900/20 flex items-center justify-center">
                          <Shield className="text-blue-500 w-6 h-6" />
                          <div className="absolute inset-0 border border-blue-900/30 rounded-md"></div>
                        </div>
                        <HoveredLink href="/document-chat" className="text-left">Document Chat</HoveredLink>
                      </div>
                      
                      <div className="flex items-center gap-3 hover:bg-red-900/20 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-md bg-red-900/20 flex items-center justify-center">
                          <BarChart4 className="text-red-500 w-6 h-6" />
                          <div className="absolute inset-0 border border-red-900/30 rounded-md"></div>
                        </div>
                        <HoveredLink href="/data-processing" className="text-left">Data Processing</HoveredLink>
                      </div>
                    </div>
                  </div>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActiveItem} active={activeItem} item="Services">
                <div className="grid grid-cols-2 gap-5 p-4 w-[550px]">
                  <div className="col-span-2 mb-2">
                    <div className="relative overflow-hidden rounded-lg border border-orange-900/30 group h-28">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-yellow-900/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="w-full h-full bg-gradient-to-br from-orange-900/40 to-yellow-900/30 flex items-center justify-center">
                        <Sun size={42} className="text-yellow-400" />
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-black/80 via-black/70 to-black/80">
                        <h4 className="text-white font-bold text-lg text-center">Solar Services</h4>
                        <p className="text-gray-300 text-sm text-center max-w-xs">
                          Complete solar installation and maintenance solutions
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Solar Installations</h3>
                    </div>
                    
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <HoveredLink href="/residential-solar">Residential Solar Systems</HoveredLink>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <HoveredLink href="/commercial-solar">Commercial Solar Projects</HoveredLink>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <HoveredLink href="/battery-storage">Battery Storage Systems</HoveredLink>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <HoveredLink href="/hybrid-systems">Solar + Storage Hybrid</HoveredLink>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Services & Maintenance</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <HoveredLink href="/maintenance" className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors">
                        <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                          <Settings size={18} />
                        </div>
                        <span className="text-white hover:text-orange-400 transition-colors">System Maintenance</span>
                      </HoveredLink>
                      
                      <HoveredLink href="/repairs" className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors">
                        <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                          <Wrench size={18} />
                        </div>
                        <span className="text-white hover:text-orange-400 transition-colors">Repair Services</span>
                      </HoveredLink>
                      
                      <div className="flex flex-col gap-1.5 p-3 bg-gradient-to-br from-orange-900/20 to-yellow-900/10 rounded-lg border border-orange-900/30">
                        <span className="text-sm text-gray-300">Need professional service?</span>
                        <HoveredLink href="/contact" className="text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">
                          Schedule consultation →
                        </HoveredLink>
                      </div>
                    </div>
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Mobile Menu Button - Enhanced styling */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 rounded-lg transition-all duration-300 z-10 relative 
                   bg-gradient-to-br from-gray-900/90 to-gray-800/90 
                   hover:from-orange-950/30 hover:to-blue-950/30 
                   border border-gray-700/40 hover:border-orange-500/40
                   shadow-[0_4px_10px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_15px_rgba(255,106,0,0.2)]"
          aria-label="Toggle mobile menu"
        >
          <div className="relative">
            <span className={`block ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''} h-0.5 w-6 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transform transition-all duration-300 mb-1.5`}></span>
            <span className={`block ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'} h-0.5 w-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transform transition-all duration-300 mb-1.5`}></span>
            <span className={`block ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''} h-0.5 w-6 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full transform transition-all duration-300`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default Header;
