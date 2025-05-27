import { motion } from "framer-motion";
import { useState } from "react";
import { Sun, Battery, Zap, Shield, ArrowRight, Phone, Mail, Calculator } from "lucide-react";

const SolarSalesFunnelSection = () => {
  const [selectedFunnel, setSelectedFunnel] = useState(null);

  const salesFunnels = [
    {
      id: "residential",
      title: "Residential Solar",
      subtitle: "Homeowner Solutions",
      color: "from-yellow-400 via-orange-500 to-red-500",
      bgGradient: "from-yellow-500/20 via-orange-500/15 to-red-500/10",
      borderColor: "border-yellow-500/40",
      icon: <Sun className="w-10 h-10" />,
      description: "Transform your home with premium solar energy systems designed for maximum efficiency and long-term savings",
      benefits: ["Reduce energy bills by 90%", "25-year comprehensive warranty", "Free professional consultation", "Flexible financing options"],
      ctaText: "Get Free Home Assessment",
      formType: "residential"
    },
    {
      id: "commercial",
      title: "Commercial Solar", 
      subtitle: "Business Solutions",
      color: "from-blue-400 via-cyan-500 to-blue-600",
      bgGradient: "from-blue-500/20 via-cyan-500/15 to-blue-600/10",
      borderColor: "border-blue-500/40",
      icon: <Zap className="w-10 h-10" />,
      description: "Enterprise-grade solar solutions that deliver substantial ROI and sustainable energy independence for your business",
      benefits: ["Federal tax incentives", "ROI in 3-5 years", "Advanced performance monitoring", "Commercial-grade warranties"],
      ctaText: "Get Business Assessment",
      formType: "commercial"
    },
    {
      id: "storage",
      title: "Battery Storage",
      subtitle: "Energy Independence", 
      color: "from-green-400 via-emerald-500 to-green-600",
      bgGradient: "from-green-500/20 via-emerald-500/15 to-green-600/10",
      borderColor: "border-green-500/40",
      icon: <Battery className="w-10 h-10" />,
      description: "Cutting-edge battery storage systems that provide reliable backup power and complete energy autonomy",
      benefits: ["24/7 power availability", "Blackout protection", "Grid independence", "Intelligent energy management"],
      ctaText: "Get Storage Assessment",
      formType: "storage"
    },
    {
      id: "maintenance",
      title: "Service & Repair",
      subtitle: "Professional Maintenance",
      color: "from-purple-400 via-indigo-500 to-purple-600", 
      bgGradient: "from-purple-500/20 via-indigo-500/15 to-purple-600/10",
      borderColor: "border-purple-500/40",
      icon: <Shield className="w-10 h-10" />,
      description: "Expert maintenance and repair services to ensure your solar investment continues performing at peak efficiency",
      benefits: ["Performance optimization", "Advanced system diagnostics", "Professional panel cleaning", "Warranty protection"],
      ctaText: "Schedule Expert Service",
      formType: "maintenance"
    }
  ];

  const LeadCaptureForm = ({ funnelType, onClose }) => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      roofType: "",
      monthlyBill: "",
      timeframe: "",
      source: funnelType
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Here we would integrate with the CRM
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          alert('Thank you! We will contact you within 24 hours.');
          onClose();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Thank you for your interest! Please call us at (530) 226-0701.');
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Solar Quote</h3>
            <p className="text-gray-600">Licensed • Bonded • Insured • 25+ Years Experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            
            <input
              type="text"
              placeholder="Property Address"
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            
            <select
              value={formData.monthlyBill}
              onChange={(e) => setFormData({...formData, monthlyBill: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Monthly Electric Bill</option>
              <option value="Under $100">Under $100</option>
              <option value="$100-200">$100-200</option>
              <option value="$200-300">$200-300</option>
              <option value="$300-500">$300-500</option>
              <option value="Over $500">Over $500</option>
            </select>
            
            <select
              value={formData.timeframe}
              onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Installation Timeframe</option>
              <option value="ASAP">As soon as possible</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6+ months">6+ months</option>
              <option value="Just researching">Just researching</option>
            </select>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Get My Free Quote
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-3">Or call us directly:</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="tel:5302260701" className="flex items-center text-yellow-600 hover:text-yellow-700">
                <Phone className="w-4 h-4 mr-2" />
                (530) 226-0701
              </a>
              <a href="mailto:info@apredding.net" className="flex items-center text-yellow-600 hover:text-yellow-700">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 overflow-hidden">
      {/* Solar Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-orange-200/15 to-amber-200/20"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-yellow-300/15 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-orange-300/15 to-amber-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Solar Panel Installation Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="solar-installation-grid" width="120" height="80" patternUnits="userSpaceOnUse">
              {/* Rooftop Solar Panel Layout */}
              <rect x="10" y="10" width="45" height="30" fill="rgba(30, 58, 138, 0.1)" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="0.8" rx="3"/>
              <rect x="65" y="10" width="45" height="30" fill="rgba(30, 58, 138, 0.1)" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="0.8" rx="3"/>
              <rect x="10" y="45" width="45" height="30" fill="rgba(30, 58, 138, 0.1)" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="0.8" rx="3"/>
              <rect x="65" y="45" width="45" height="30" fill="rgba(30, 58, 138, 0.1)" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="0.8" rx="3"/>
              {/* Solar Cell Details */}
              <line x1="32" y1="10" x2="32" y2="40" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.4"/>
              <line x1="87" y1="10" x2="87" y2="40" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.4"/>
              <line x1="32" y1="45" x2="32" y2="75" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.4"/>
              <line x1="87" y1="45" x2="87" y2="75" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#solar-installation-grid)" />
        </svg>
      </div>

      {/* Massive Solar Panel Farm Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Solar Installation - Top Center */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-56 h-32 bg-gradient-to-br from-blue-900/12 to-blue-700/8 border border-blue-500/20 rounded-xl rotate-1 animate-pulse shadow-lg">
          <div className="grid grid-cols-7 grid-rows-4 gap-0.5 p-2 h-full">
            {[...Array(28)].map((_, i) => (
              <div key={i} className="bg-blue-800/15 rounded-sm border border-blue-600/15"></div>
            ))}
          </div>
        </div>

        {/* Solar Panel Array - Left Side */}
        <div className="absolute top-1/4 left-8 w-44 h-26 bg-gradient-to-br from-blue-900/15 to-blue-700/10 border border-blue-500/25 rounded-lg -rotate-3 animate-pulse delay-500 shadow-xl">
          <div className="grid grid-cols-6 grid-rows-3 gap-0.5 p-1.5 h-full">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="bg-blue-800/18 rounded-sm border border-blue-600/18"></div>
            ))}
          </div>
        </div>

        {/* Commercial Solar Installation - Right Side */}
        <div className="absolute top-1/3 right-12 w-48 h-28 bg-gradient-to-br from-blue-900/10 to-blue-700/8 border border-blue-500/20 rounded-lg rotate-4 animate-pulse delay-1000 shadow-lg">
          <div className="grid grid-cols-6 grid-rows-3 gap-0.5 p-2 h-full">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="bg-blue-800/12 rounded-sm border border-blue-600/12"></div>
            ))}
          </div>
        </div>

        {/* Solar Panel Cluster - Bottom Left */}
        <div className="absolute bottom-16 left-20 w-40 h-24 bg-gradient-to-br from-blue-900/12 to-blue-700/8 border border-blue-500/22 rounded-lg rotate-2 animate-pulse delay-1500 shadow-md">
          <div className="grid grid-cols-5 grid-rows-3 gap-0.5 p-1.5 h-full">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="bg-blue-800/15 rounded-sm border border-blue-600/15"></div>
            ))}
          </div>
        </div>

        {/* Residential Solar Array - Bottom Right */}
        <div className="absolute bottom-20 right-24 w-36 h-22 bg-gradient-to-br from-blue-900/14 to-blue-700/10 border border-blue-500/24 rounded-lg -rotate-2 animate-pulse delay-800 shadow-lg">
          <div className="grid grid-cols-4 grid-rows-3 gap-0.5 p-1.5 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-blue-800/16 rounded-sm border border-blue-600/16"></div>
            ))}
          </div>
        </div>

        {/* Additional Scattered Solar Panels */}
        <div className="absolute top-2/3 left-1/4 w-28 h-18 bg-gradient-to-br from-blue-900/10 to-blue-700/8 border border-blue-500/18 rounded-md rotate-6 animate-pulse delay-2000 shadow-sm">
          <div className="grid grid-cols-3 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-blue-800/12 rounded-sm border border-blue-600/12"></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-1/3 left-2/3 w-32 h-20 bg-gradient-to-br from-blue-900/12 to-blue-700/8 border border-blue-500/20 rounded-lg -rotate-4 animate-pulse delay-1200 shadow-md">
          <div className="grid grid-cols-4 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-blue-800/14 rounded-sm border border-blue-600/14"></div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 right-1/4 w-24 h-16 bg-gradient-to-br from-blue-900/11 to-blue-700/8 border border-blue-500/19 rounded-md rotate-3 animate-pulse delay-1800 shadow-sm">
          <div className="grid grid-cols-3 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-blue-800/13 rounded-sm border border-blue-600/13"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Solar Typography */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-800 mb-12 leading-tight">
            Find Your Perfect{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                Solar Solution
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-700 max-w-5xl mx-auto font-light leading-relaxed mb-8">
            Choose your solar journey below and get a custom quote from Northern California's most trusted solar experts.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 text-lg font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Licensed & Insured</span>
            </div>
            <div className="w-1 h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              <span>20+ Years Experience</span>
            </div>
            <div className="w-1 h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-600"></div>
              <span>Free Consultations</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {salesFunnels.map((funnel, index) => (
            <motion.div
              key={funnel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -8 }}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 border ${funnel.borderColor} hover:border-opacity-60 overflow-hidden`}
            >
              {/* Enterprise Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${funnel.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              {/* Premium Card Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${funnel.color} rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Enhanced Icon Container */}
                <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${funnel.color} rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                  <div className="text-white">
                    {funnel.icon}
                  </div>
                  <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-sm"></div>
                </div>
                
                {/* Premium Typography */}
                <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                  {funnel.title}
                </h3>
                
                <p className="text-base text-gray-600 mb-6 font-semibold tracking-wide">
                  {funnel.subtitle}
                </p>
                
                <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  {funnel.description}
                </p>
                
                {/* Enhanced Benefits List */}
                <ul className="space-y-3 mb-10">
                  {funnel.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-700 font-medium">
                      <div className={`w-3 h-3 bg-gradient-to-r ${funnel.color} rounded-full mr-4 shadow-lg`}></div>
                      <span className="text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Premium CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFunnel(funnel)}
                  className={`group/btn relative w-full py-4 bg-gradient-to-r ${funnel.color} text-white font-bold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center overflow-hidden`}
                >
                  {/* Button Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${funnel.color} rounded-2xl blur-lg opacity-60 group-hover/btn:opacity-80 transition-opacity duration-500`}></div>
                  
                  <div className="relative flex items-center gap-3">
                    <span>{funnel.ctaText}</span>
                    <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help Choosing?</h3>
            <p className="text-gray-300 mb-6">
              Speak with our solar experts for personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5302260701"
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (530) 226-0701
              </a>
              <button
                onClick={() => setSelectedFunnel(salesFunnels[0])}
                className="px-8 py-3 border-2 border-gray-300 text-gray-300 font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Calculator className="w-5 h-5 mr-2 inline" />
                Start Solar Calculator
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lead Capture Form Modal */}
      {selectedFunnel && (
        <LeadCaptureForm
          funnelType={selectedFunnel.formType}
          onClose={() => setSelectedFunnel(null)}
        />
      )}
    </section>
  );
};

export default SolarSalesFunnelSection;