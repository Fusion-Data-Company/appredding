import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher";
import { Sun, Moon, ChevronDown, Shield, ShieldCheck, Flame, LifeBuoy, Building2, Home, BriefcaseBusiness, BarChart4 } from "lucide-react";
import praetorianShield from "@assets/Untitled design (6).png";

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
              src={praetorianShield} 
              alt="Praetorian Shield" 
              className="h-12 w-auto relative z-10 transition-all duration-300 hover:scale-105 filter drop-shadow-lg"
            />
          </div>
          <div className="tracking-tight flex items-center">
            <div className="text-[1.2rem] sm:text-[1.35rem] md:text-[1.6rem] leading-none whitespace-nowrap">
              <span className="gradient-text-combined font-bold">Praetorian</span>
              <span className="text-white/90 mx-1 font-light">|</span>
              <span className="gradient-text-blue font-medium">SmartCoat</span>
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
              <MenuItem setActive={setActiveItem} active={activeItem} item="Applications">
                <div className="grid grid-cols-2 gap-4 p-4 w-[500px]">
                  <div className="col-span-2 mb-2 pb-2 border-b border-gray-700/30">
                    <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Enterprise Solutions</h3>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-blue-900/30 text-blue-400">
                      <LifeBuoy size={18} />
                    </div>
                    <HoveredLink href="/pools" className="text-left">Pools</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-blue-900/30 text-blue-400">
                      <Shield size={18} />
                    </div>
                    <HoveredLink href="/marinas" className="text-left">Marinas</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                      <Flame size={18} />
                    </div>
                    <HoveredLink href="/fire-prevention" className="text-left">Fire Prevention</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                      <Building2 size={18} />
                    </div>
                    <HoveredLink href="/construction" className="text-left">Construction</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-blue-900/30 text-blue-400">
                      <Home size={18} />
                    </div>
                    <HoveredLink href="/mobile-home" className="text-left">Mobile Home</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-blue-900/30 text-blue-400">
                      <ShieldCheck size={18} />
                    </div>
                    <HoveredLink href="/municipality" className="text-left">Municipality</HoveredLink>
                  </div>
                  
                  <div className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors">
                    <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <HoveredLink href="/painters" className="text-left">Painters</HoveredLink>
                  </div>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActiveItem} active={activeItem} item="About">
                <div className="flex flex-col space-y-1 p-4 w-[280px]">
                  <div className="mb-2 pb-2 border-b border-gray-700/30">
                    <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Company Information</h3>
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
              
              <MenuItem setActive={setActiveItem} active={activeItem} item="Solutions">
                <div className="flex gap-6 p-4 w-[550px]">
                  <div className="w-1/2">
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Enterprise Solutions</h3>
                    </div>
                    
                    {/* Professional Solutions Section */}
                    <div className="grid gap-3">
                      <div className="relative overflow-hidden rounded-lg border border-orange-900/30 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-blue-900/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img 
                          src="/src/assets_dir/images/optimized/fire-prevention.jpg" 
                          alt="Fire Prevention"
                          className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/90 to-transparent">
                          <h4 className="text-white font-bold text-sm">Fire Prevention</h4>
                          <p className="text-gray-300 text-xs">Advanced thermal barrier protection</p>
                          <Link href="/fire-prevention" className="absolute inset-0">
                            <span className="sr-only">Fire Prevention</span>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="relative overflow-hidden rounded-lg border border-blue-900/30 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-orange-900/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img 
                          src="/src/assets_dir/images/optimized/marine-application.jpg" 
                          alt="Marine Solutions"
                          className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/90 to-transparent">
                          <h4 className="text-white font-bold text-sm">Marine Protection</h4>
                          <p className="text-gray-300 text-xs">Superior coating for marine environments</p>
                          <Link href="/marinas" className="absolute inset-0">
                            <span className="sr-only">Marine Solutions</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-1/2">
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Specific Applications</h3>
                    </div>
                    
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-md">
                          <img 
                            src="/src/assets_dir/images/optimized/pools-category.jpg" 
                            alt="Pool Applications" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 border border-blue-900/30 rounded-md"></div>
                        </div>
                        <HoveredLink href="/pools" className="text-left">Pool Applications</HoveredLink>
                      </div>
                      
                      <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-md">
                          <img 
                            src="/src/assets_dir/images/optimized/construction-hero.jpg"  
                            alt="Construction" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 border border-orange-900/30 rounded-md"></div>
                        </div>
                        <HoveredLink href="/construction" className="text-left">Construction</HoveredLink>
                      </div>
                      
                      <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-md">
                          <img 
                            src="/src/assets_dir/images/optimized/mobile-home-bg.jpg" 
                            alt="Mobile Home" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 border border-blue-900/30 rounded-md"></div>
                        </div>
                        <HoveredLink href="/mobile-home" className="text-left">Mobile Home</HoveredLink>
                      </div>
                      
                      <div className="flex items-center gap-3 hover:bg-blue-900/20 p-2 rounded-lg transition-colors">
                        <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-md">
                          <img 
                            src="/src/assets_dir/images/optimized/municipality-bg.jpg" 
                            alt="Municipality" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 border border-blue-900/30 rounded-md"></div>
                        </div>
                        <HoveredLink href="/municipality" className="text-left">Municipality</HoveredLink>
                      </div>
                    </div>
                  </div>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setActiveItem} active={activeItem} item="Professionals">
                <div className="grid grid-cols-2 gap-5 p-4 w-[550px]">
                  <div className="col-span-2 mb-2">
                    <div className="relative overflow-hidden rounded-lg border border-blue-900/30 group h-28">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-orange-900/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img 
                        src="/src/assets_dir/images/optimized/painter-bg.jpg" 
                        alt="Professional Programs"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-black/80 via-black/70 to-black/80">
                        <h4 className="text-white font-bold text-lg text-center">Professional Programs</h4>
                        <p className="text-gray-300 text-sm text-center max-w-xs">
                          Industry-leading solutions for licensed professionals
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Program Benefits</h3>
                    </div>
                    
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <span>Exclusive training & certification</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <span>Preferred pricing structure</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <span>Technical support access</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                        <span>Marketing & promotional tools</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="mb-3 pb-2 border-b border-gray-700/30">
                      <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Professional Sign-up</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <Link href="/painters" className="flex items-center gap-3 hover:bg-orange-900/20 p-2 rounded-lg transition-colors">
                        <div className="p-2 rounded-full bg-orange-900/30 text-orange-400">
                          <BriefcaseBusiness size={18} />
                        </div>
                        <span className="text-white hover:text-orange-400 transition-colors">Professional Painters</span>
                      </Link>
                      
                      <div className="flex flex-col gap-1.5 p-3 bg-gradient-to-br from-blue-900/20 to-orange-900/10 rounded-lg border border-blue-900/30">
                        <span className="text-sm text-gray-300">Ready to become certified?</span>
                        <Link href="/contact" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                          Contact our team →
                        </Link>
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
