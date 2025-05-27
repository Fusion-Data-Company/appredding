import React from 'react';
import { Link } from 'wouter';
import { Sun, Zap, Battery, Building2, Home, Shield, Mail, Users, Phone, FileText, BarChart3, HeartPulse } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-orange-50 to-yellow-100 py-14 mt-10 border-t border-orange-200 z-20">
      {/* Solar ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-0 w-96 h-96 bg-yellow-400/15 rounded-full filter blur-3xl opacity-80"></div>
        <div className="absolute right-1/4 top-1/2 w-64 h-64 bg-orange-500/15 rounded-full filter blur-3xl opacity-80"></div>
        <div className="absolute center top-1/3 w-48 h-48 bg-red-400/10 rounded-full filter blur-3xl opacity-60"></div>
      </div>
      
      {/* Solar accent lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
      <div className="absolute left-[15%] w-[25%] bottom-0 h-px bg-gradient-to-r from-transparent to-orange-500/40"></div>
      <div className="absolute right-[15%] w-[25%] bottom-0 h-px bg-gradient-to-l from-transparent to-red-500/40"></div>

      <div className="container mx-auto px-6 relative z-30">
        {/* Logo section */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-[1.8rem] leading-none whitespace-nowrap font-bold">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">Advance Power</span>
              <span className="text-orange-700 mx-1 font-light">|</span>
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Redding</span>
            </div>
          </div>
          <div className="text-center max-w-lg">
            <p className="text-orange-800 text-sm font-medium">
              Solar installation and renewable energy solutions serving Shasta County 
              since 1999 with expert design, installation, and service.
            </p>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Contact Information */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2 font-sans">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Contact Information</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-orange-500/50 to-transparent"></div>
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Phone size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Phone:</p>
                </div>
                <a href="tel:+15302415297" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  (530) 241-5297
                </a>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Mail size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Email:</p>
                </div>
                <a href="mailto:info@advancepowerredding.com" className="block pl-6 text-white hover:text-orange-400 text-sm transition-colors">
                  info@advancepowerredding.com
                </a>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Building2 size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Service Area:</p>
                </div>
                <p className="block pl-6 text-white text-sm">
                  Shasta County, California
                </p>
              </li>
            </ul>
          </div>

          {/* Solar Services */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <span className="gradient-text-blue">Solar Services</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                  <Home size={12} />
                </div>
                <a href="/residential" className="text-white hover:text-orange-400 text-sm transition-colors">
                  Residential Solar
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Building2 size={12} />
                </div>
                <a href="/commercial" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Commercial Solar
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-orange-200/20 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-orange-600/30 text-orange-600 group-hover:text-orange-700 transition-colors">
                  <Battery size={12} />
                </div>
                <a href="/battery-storage" className="text-orange-800 hover:text-red-600 text-sm transition-colors font-semibold">
                  Battery Storage
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-orange-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                  <Shield size={12} />
                </div>
                <a href="/solar-repairs" className="text-white hover:text-orange-400 text-sm transition-colors">
                  Solar Repairs
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <HeartPulse size={12} />
                </div>
                <a href="/maintenance" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Maintenance
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <BarChart3 size={12} />
                </div>
                <a href="/energy-consultation" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Energy Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Financing Options */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <span className="gradient-text-blue">Financing Options</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Shield size={12} />
                </div>
                <a href="/financing" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Federal Tax Credit (30%)
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <HeartPulse size={12} />
                </div>
                <a href="/financing#solar-loans" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Solar Loans
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <BarChart3 size={12} />
                </div>
                <a href="/financing#ppa" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Power Purchase Agreements
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <FileText size={12} />
                </div>
                <a href="/financing#leasing" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Solar Leasing
                </a>
              </li>
              <li className="flex items-center gap-2 group transition-colors hover:bg-blue-900/10 rounded-md px-1 py-0.5">
                <div className="p-1 rounded-full bg-blue-900/30 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <FileText size={12} />
                </div>
                <a href="/financing#zero-down" className="text-white hover:text-blue-400 text-sm transition-colors">
                  Zero-Down Options
                </a>
              </li>
            </ul>
          </div>

          {/* Company Information */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full filter blur-xl"></div>
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <span className="gradient-text-fire">Company Information</span>
              <div className="h-px flex-grow ml-2 bg-gradient-to-r from-orange-500/30 to-transparent"></div>
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Users size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Founded:</p>
                </div>
                <p className="block pl-6 text-white text-sm">
                  1999 by Greg Tomsik
                </p>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <BarChart3 size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">Experience:</p>
                </div>
                <p className="block pl-6 text-white text-sm">
                  25+ Years in Solar
                </p>
              </li>
              <li className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Shield size={12} />
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">License:</p>
                </div>
                <p className="block pl-6 text-white text-sm">
                  CA Licensed Contractor
                </p>
              </li>
              <li className="group">
                <a href="/contact" className="flex items-center gap-2 text-white hover:text-orange-400 text-sm transition-colors group-hover:bg-orange-900/10 rounded-md px-2 py-1">
                  <div className="p-1 rounded-full bg-orange-900/30 text-orange-400 group-hover:text-orange-300 transition-colors">
                    <Mail size={12} />
                  </div>
                  Get Free Quote
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
            &copy; {currentYear} Advance Power Redding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
