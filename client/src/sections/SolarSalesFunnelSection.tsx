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
      color: "from-yellow-500 to-orange-500",
      icon: <Sun className="w-8 h-8" />,
      description: "Custom solar systems for your home",
      benefits: ["Reduce energy bills by 90%", "25-year warranty", "Free consultation", "Financing available"],
      ctaText: "Get Free Home Quote",
      formType: "residential"
    },
    {
      id: "commercial",
      title: "Commercial Solar", 
      subtitle: "Business Solutions",
      color: "from-blue-500 to-cyan-500",
      icon: <Zap className="w-8 h-8" />,
      description: "Scalable solar solutions for businesses",
      benefits: ["Tax incentives", "ROI in 3-5 years", "Performance monitoring", "Commercial warranties"],
      ctaText: "Get Business Quote",
      formType: "commercial"
    },
    {
      id: "storage",
      title: "Battery Storage",
      subtitle: "Energy Independence", 
      color: "from-green-500 to-emerald-500",
      icon: <Battery className="w-8 h-8" />,
      description: "Hybrid systems with battery backup",
      benefits: ["24/7 power availability", "Blackout protection", "Grid independence", "Smart energy management"],
      ctaText: "Get Storage Quote",
      formType: "storage"
    },
    {
      id: "maintenance",
      title: "Service & Repair",
      subtitle: "Professional Maintenance",
      color: "from-purple-500 to-indigo-500", 
      icon: <Shield className="w-8 h-8" />,
      description: "Keep your system running at peak efficiency",
      benefits: ["Performance optimization", "System diagnostics", "Panel cleaning", "Warranty protection"],
      ctaText: "Schedule Service",
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Solar Solution</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your solar journey below and get a custom quote from Northern California's most trusted solar experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {salesFunnels.map((funnel, index) => (
            <motion.div
              key={funnel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 group relative overflow-hidden"
            >
              {/* Colored gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${funnel.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${funnel.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {funnel.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {funnel.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  {funnel.subtitle}
                </p>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {funnel.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {funnel.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-700 text-sm">
                      <div className={`w-2 h-2 bg-gradient-to-r ${funnel.color} rounded-full mr-3`}></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFunnel(funnel)}
                  className={`w-full py-3 bg-gradient-to-r ${funnel.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
                >
                  {funnel.ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
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