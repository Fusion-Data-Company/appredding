import React from 'react';
import { Shield, Flame, Ship, LifeBuoy, Building2, Home, ShieldCheck, Mail, Users, Phone, FileText, BarChart3, HeartPulse } from 'lucide-react';
import praetorianShield from "@assets/Untitled design (6).png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-black to-[#080c14] py-14 mt-10 border-t border-gray-800/40 z-20">
      {/* Premium ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/3 top-0 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute right-1/3 top-1/2 w-64 h-64 bg-orange-600/5 rounded-full filter blur-3xl opacity-70"></div>
      </div>
      
      {/* Accent lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute left-[10%] w-[20%] bottom-0 h-px bg-gradient-to-r from-transparent to-orange-500/20"></div>
      <div className="absolute right-[10%] w-[20%] bottom-0 h-px bg-gradient-to-l from-transparent to-blue-500/20"></div>

      <div className="container mx-auto px-6 relative z-30">
        {/* Logo section */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 filter blur-md rounded-full"></div>
              <img 
                src={praetorianShield} 
                alt="Praetorian Shield" 
                className="h-14 w-auto relative z-10 filter drop-shadow-lg"
              />
            </div>
            <div className="text-[1.8rem] leading-none whitespace-nowrap">
              <span className="gradient-text-combined font-bold">Praetorian</span>
              <span className="text-white/90 mx-1 font-light">|</span>
              <span className="gradient-text-blue font-medium">SmartCoat</span>
            </div>
          </div>
          <div className="text-center max-w-lg">
            <p className="text-gray-300 text-sm">
              Advanced ceramic coating technology delivering superior protection 
              for a wide range of applications with proven performance.
            </p>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Department Contacts */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <span className="gradient-text-fire">Department Contacts</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-orange-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Mail size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Orders:</p>
                </div>
                <a href="mailto:orders@praetoriansmartcoat.com" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  orders@praetoriansmartcoat.com
                </a>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Building2 size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Office:</p>
                </div>
                <a href="mailto:office@praetoriansmartcoat.com" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  office@praetoriansmartcoat.com
                </a>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Users size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Distributors:</p>
                </div>
                <a href="mailto:distributors@praetoriansmartcoat.com" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  distributors@praetoriansmartcoat.com
                </a>
              </li>
            </ul>
          </div>

          {/* Applications */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <span className="gradient-text-blue">Applications</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                  <Flame size={12} />
                </div>
                <a href="/fire-prevention" className="text-white hover:text-orange-400 text-sm transition-colors">
                  Wildfire Protection
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Ship size={12} />
                </div>
                <a href="/marinas" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Marine
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <LifeBuoy size={12} />
                </div>
                <a href="/pools" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Pool
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-orange-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                  <Building2 size={12} />
                </div>
                <a href="/construction" className="text-white hover:text-orange-400 text-sm transition-colors">
                  Construction
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Home size={12} />
                </div>
                <a href="/mobile-home" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Mobile Home
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <ShieldCheck size={12} />
                </div>
                <a href="/municipality" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Municipality
                </a>
              </li>
            </ul>
          </div>

          {/* Our Product */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <span className="gradient-text-blue">Our Product</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Shield size={12} />
                </div>
                <a href="/products" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Protective Coating
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <HeartPulse size={12} />
                </div>
                <a href="/products#benefits" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Product Benefits
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <BarChart3 size={12} />
                </div>
                <a href="/technology" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Performance Data
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <FileText size={12} />
                </div>
                <a href="/technology#specs" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Technical Specifications
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <FileText size={12} />
                </div>
                <a href="/documents/sds" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Safety Data Sheet
                </a>
              </li>
            </ul>
          </div>

          {/* Main Contact */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <span className="gradient-text-fire">Main Contact</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-orange-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Mail size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">General Information:</p>
                </div>
                <a href="mailto:info@praetoriansmartcoat.com" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  info@praetoriansmartcoat.com
                </a>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Users size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Management:</p>
                </div>
                <a href="mailto:rob@praetoriansmartcoat.com" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  rob@praetoriansmartcoat.com
                </a>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Phone size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Phone:</p>
                </div>
                <a href="tel:+19168096619" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  (916) 809-6619
                </a>
              </li>
              <li className="group">
                <a href="/contact" className="flex items-center gap-2 text-white hover:text-orange-400 text-sm transition-colors group-hover:bg-orange-900/10 rounded-md px-2 py-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Mail size={12} />
                  </div>
                  Contact Form
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="relative flex flex-col items-center gap-4 pt-8 border-t border-gray-800/30">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-2 bg-gradient-to-r from-black via-[#080c14] to-black">
            <div className="flex gap-3 items-center">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/30"></div>
              <Shield className="h-4 w-4 text-gray-500" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/30"></div>
            </div>
          </div>
          
          <div className="flex gap-6 mb-4">
            <Link href="/about" className="text-gray-400 hover:text-white text-xs transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-xs transition-colors">Contact</Link>
            <Link href="/" className="text-gray-400 hover:text-white text-xs transition-colors">Home</Link>
          </div>
          
          <p className="text-gray-500 text-xs font-medium">
            &copy; {currentYear} Praetorian SmartCoat Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
