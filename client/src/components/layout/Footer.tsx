import React, { useState } from 'react';
import { 
  Sun, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Zap,
  Send
} from 'lucide-react';

const SolarFooter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-8 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Stay Powered with Updates
              </h3>
              <p className="text-slate-400 text-sm">
                Subscribe to our newsletter for the latest solar innovations, exclusive offers, and energy-saving tips.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {/* Company Info */}
          <div className="lg:col-span-2 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/50 group-hover:scale-105 transition-transform duration-300">
                <Sun className="h-7 w-7" />
              </div>
              <span className="ml-3 text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Advance Power Redding
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm">
              Leading provider of government-certified solar energy solutions in Northern California. Delivering sustainable, reliable, and cost-effective renewable energy systems with military-grade quality standards.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-slate-300 font-medium">Licensed & Bonded</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <Award className="h-4 w-4 text-cyan-400" />
                <span className="text-xs text-slate-300 font-medium">25+ Years</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-slate-300 font-medium">Emergency Service</span>
              </div>
            </div>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-bold tracking-tight mb-5 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Residential Solar",
                "Commercial Solar",
                "Solar Repairs",
                "System Maintenance",
                "Energy Storage",
                "Emergency Service"
              ].map((service, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-base font-bold tracking-tight mb-5 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {[
                "Redding",
                "Shasta County",
                "Chico",
                "Yuba City",
                "Northern California",
                "Emergency Coverage"
              ].map((area, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold tracking-tight mb-5 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="text-sm text-slate-400 flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Redding, CA<br />Northern California</span>
              </li>
              <li>
                <a href="mailto:info@advancepowerredding.com" className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <Mail className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                  info@advancepowerredding.com
                </a>
              </li>
              <li>
                <a href="tel:+15302260701" className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <Phone className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                  (530) 226-0701
                </a>
              </li>
              <li className="pt-2">
                <div className="text-xs text-slate-500 font-medium mb-2">Business Hours:</div>
                <div className="text-sm text-slate-400">Mon-Fri: 8AM - 6PM PST</div>
                <div className="text-sm text-slate-400">Sat: 9AM - 4PM PST</div>
                <div className="text-sm text-slate-400">Emergency: 24/7</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium text-center md:text-left">
              © {new Date().getFullYear()} Advance Power Redding. All rights reserved. Licensed & Insured.
            </p>
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" },
                { name: "Compliance", href: "#" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-slate-500 hover:text-blue-400 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SolarFooter;
