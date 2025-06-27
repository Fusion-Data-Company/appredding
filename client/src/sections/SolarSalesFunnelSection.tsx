import { motion } from "framer-motion";
import { useState } from "react";
import { Sun, Battery, Zap, Shield, ArrowRight, Phone, Mail, Calculator } from "lucide-react";

const SolarSalesFunnelSection = () => {
  const [selectedFunnel, setSelectedFunnel] = useState<any>(null);

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

  const LeadCaptureForm = ({ funnelType, onClose }: { funnelType: string; onClose: () => void }) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
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
            <p className="text-gray-700 font-medium">Licensed • Bonded • Insured • 25+ Years Experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-600 bg-white"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-600 bg-white"
              />
            </div>
            
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-600 bg-white"
            />
            
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-600 bg-white"
            />
            
            <input
              type="text"
              placeholder="Property Address"
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-600 bg-white"
            />
            
            <select
              value={formData.monthlyBill}
              onChange={(e) => setFormData({...formData, monthlyBill: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
            >
              <option value="" className="text-gray-600">Monthly Electric Bill</option>
              <option value="Under $100" className="text-gray-900">Under $100</option>
              <option value="$100-200" className="text-gray-900">$100-200</option>
              <option value="$200-300" className="text-gray-900">$200-300</option>
              <option value="$300-500" className="text-gray-900">$300-500</option>
              <option value="Over $500" className="text-gray-900">Over $500</option>
            </select>
            
            <select
              value={formData.timeframe}
              onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
            >
              <option value="" className="text-gray-600">Installation Timeframe</option>
              <option value="ASAP" className="text-gray-900">As soon as possible</option>
              <option value="1-3 months" className="text-gray-900">1-3 months</option>
              <option value="3-6 months" className="text-gray-900">3-6 months</option>
              <option value="6+ months" className="text-gray-900">6+ months</option>
              <option value="Just researching" className="text-gray-900">Just researching</option>
            </select>

            <button
              type="submit"
              className="button-primary w-full py-4"
            >
              <span className="relative z-10">Get My Free Quote</span>
              <div className="shine-effect"></div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700 font-medium mb-3">Or call us directly:</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="tel:5302260701" className="flex items-center text-yellow-600 hover:text-yellow-700 font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                (530) 226-0701
              </a>
              <a href="mailto:info@apredding.net" className="flex items-center text-yellow-600 hover:text-yellow-700 font-semibold">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold leading-none"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 overflow-hidden">
      {/* Solar Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-orange-200/15 to-amber-200/20"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-yellow-300/15 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-orange-300/15 to-amber-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight drop-shadow-md">
            <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">Find Your Perfect</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                Solar Solution
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl max-w-5xl mx-auto font-bold leading-relaxed mb-8"
             style={{ color: '#000000 !important' }}>
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

        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {salesFunnels.map((funnel, index) => (
            <motion.div
              key={funnel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="relative w-full min-h-[580px] flex flex-col justify-between p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-orange-200 hover:border-opacity-60 overflow-hidden lg:w-[calc(25%-1.5rem)] md:w-[calc(50%-1.5rem)]"
            >
              {/* Premium Card Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${funnel.color} rounded-3xl blur-lg opacity-20 pointer-events-none z-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              {/* Enterprise Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${funnel.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-0`}></div>
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Enhanced Icon Container */}
                <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${funnel.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                  <div className="text-white">
                    {funnel.icon}
                  </div>
                  <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-sm"></div>
                </div>
                
                {/* Premium Typography */}
                <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                  {funnel.title}
                </h3>
                
                <p className="text-base text-gray-600 mb-4 font-semibold tracking-wide">
                  {funnel.subtitle}
                </p>
                
                <p className="text-gray-700 mb-6 leading-relaxed text-lg font-medium flex-1">
                  {funnel.description}
                </p>
                
                {/* Enhanced Benefits List */}
                <ul className="space-y-3 mb-8">
                  {funnel.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-gray-700 font-medium">
                      <div className={`w-3 h-3 bg-gradient-to-r ${funnel.color} rounded-full mr-4 shadow-lg flex-shrink-0 mt-1`}></div>
                      <span className="text-base leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Premium CTA Button - Always at bottom */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFunnel(funnel)}
                  className="button-primary w-full py-4 rounded-2xl text-lg mt-auto"
                >
                  {/* Solar panel grid background pattern */}
                  <div className="solar-panel-grid">
                    <div>
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="solar-panel-cell"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Animated sun rays */}
                  <div className="solar-rays">
                    <div className="solar-ray-animation">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="solar-ray"
                          style={{
                            transform: `rotate(${i * 45}deg) translateY(-16px)`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <span>{funnel.ctaText}</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  <div className="shine-effect"></div>
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
            <p className="text-white mb-6">
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