import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar, Sun } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us Today",
      subtitle: "(530) 226-0701",
      description: "Speak directly with our solar experts",
      action: "Call Now",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Free Consultation",
      subtitle: "Schedule Online",
      description: "Book your personalized solar assessment",
      action: "Schedule Now",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Quote",
      subtitle: "info@advancepower.com",
      description: "Get your custom solar proposal via email",
      action: "Email Us",
      color: "from-red-500 to-yellow-500"
    }
  ];

  const officeInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Service Area",
      details: "Redding, Anderson, Shasta Lake, Palo Cedro, Cottonwood & All of Northern California"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Monday - Friday: 7:00 AM - 6:00 PM\nSaturday: 8:00 AM - 4:00 PM\nSunday: Emergency Service Only"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Response Time",
      details: "Same-day consultations available\nEmergency repairs within 24 hours\nFree estimates within 48 hours"
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 overflow-hidden">
      {/* Solar Contact Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 via-orange-200/15 to-yellow-200/20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-red-300/15 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-orange-300/15 to-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Solar Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(251, 146, 60, 0.4)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">Ready to</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                Go Solar?
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/40 to-amber-300/40 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-800 max-w-5xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Contact Northern California's most trusted solar experts today. 
            Get your free consultation and start saving with clean energy.
          </p>
        </motion.div>

        {/* Enterprise Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              {/* Premium Card Background */}
              <div className="relative bg-gradient-to-br from-white via-red-50 to-orange-50 backdrop-blur-sm rounded-3xl p-10 border-2 border-red-200 group-hover:border-orange-400 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden text-center">
                
                {/* Card Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Premium Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${method.color} rounded-2xl mb-8 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>

                  {/* Enhanced Typography */}
                  <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-500 group-hover:bg-clip-text transition-all duration-300 drop-shadow-md">
                    {method.title}
                  </h3>
                  
                  <div className={`text-2xl font-bold bg-gradient-to-r ${method.color} bg-clip-text text-transparent mb-4`}>
                    {method.subtitle}
                  </div>

                  <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                    {method.description}
                  </p>

                  {/* Elite Solar Button - Sophisticated WHY GO SOLAR Design */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="elite-solar-button w-full px-8 py-4 text-white font-bold rounded-xl text-lg"
                  >
                    {/* Elite Solar Panel Grid */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="grid grid-cols-4 gap-0.5 h-full w-full">
                        {[...Array(16)].map((_, i) => (
                          <motion.div 
                            key={i} 
                            className="bg-white/40 rounded-sm"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Premium Animated Sun Rays */}
                    <div className="absolute inset-0">
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-0.5 h-4 bg-white/30"
                            style={{
                              transformOrigin: "bottom center",
                              transform: `rotate(${i * 45}deg) translateY(-16px)`
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                    
                    {/* Elite Shine Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Premium Content */}
                    <div className="relative z-10 flex items-center justify-center gap-2 text-white">
                      <Sun className="h-5 w-5 drop-shadow-lg" />
                      <span className="font-bold tracking-wide drop-shadow-lg">{method.action}</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Office Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24"
        >
          {officeInfo.map((info, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6 text-white shadow-2xl">
                {info.icon}
              </div>
              
              <h3 className="text-2xl font-black text-gray-800 mb-4 drop-shadow-md">
                {info.title}
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                {info.details}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Enterprise Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="relative bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-sm rounded-3xl p-12 border border-red-500/50 overflow-hidden">
            
            {/* Emergency Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-2xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                🚨 Emergency Solar Service
              </h3>
              
              <p className="text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
                System down? Electrical emergency? We're here 24/7 for urgent solar repairs. 
                Don't wait - call our emergency hotline now.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white text-red-600 font-black rounded-xl text-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl"
              >
                Emergency: (530) 226-0701
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-16 border border-gray-700/50 overflow-hidden">
            
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-5xl md:text-6xl font-black text-white mb-8">
                Start Your Solar Journey Today
              </h3>
              
              <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who've made the switch to clean, 
                renewable energy. Your solar transformation starts with one call.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-black rounded-xl text-xl shadow-2xl transition-all duration-300 hover:shadow-3xl"
                >
                  Get Free Solar Assessment
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 border-2 border-gray-400 text-gray-200 font-black rounded-xl text-xl hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Download Solar Guide
                </motion.button>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-400 text-lg">
                  🌟 A+ BBB Rating | ⚡ 25+ Years Experience | 🏆 Award-Winning Service | 🔒 Fully Licensed & Insured
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;