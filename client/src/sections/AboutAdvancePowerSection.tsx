import { motion } from "framer-motion";
import { Award, Users, Calendar, MapPin } from "lucide-react";

const AboutAdvancePowerSection = () => {
  const achievements = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Founded 1999",
      description: "Over 25 years serving Northern California"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Team",
      description: "Certified solar installers and engineers"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Licensed & Insured",
      description: "Fully bonded with comprehensive coverage"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Focus",
      description: "Proudly serving Redding and surrounding areas"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-gray-50 to-slate-100 overflow-hidden">
      {/* Enterprise Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(249, 115, 22, 0.08)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-40 w-32 h-32 bg-gradient-to-br from-yellow-400/6 to-orange-500/6 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-gradient-to-br from-orange-500/6 to-red-500/6 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Enterprise Typography */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight">
              About{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Advance Power
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-lg -z-10 animate-pulse"></div>
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-gray-800 mb-8 leading-relaxed font-light">
              Founded in 1999 by Greg Tomsik, Advance Power Redding has been Northern California's 
              trusted leader in renewable energy solutions for over two decades.
            </p>
            
            <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
              We specialize in residential and commercial solar installations, hybrid systems with 
              battery storage, and comprehensive energy conservation services. Our team of certified 
              professionals is committed to helping you achieve energy independence while reducing 
              your carbon footprint.
            </p>

            {/* Enhanced Feature List */}
            <div className="space-y-6">
              <div className="flex items-start space-x-6 group">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full mt-3 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Custom Solar Design</h4>
                  <p className="text-lg text-gray-700 leading-relaxed">Every system is uniquely designed for maximum efficiency and savings</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full mt-3 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Professional Installation</h4>
                  <p className="text-lg text-gray-700 leading-relaxed">Licensed, bonded, and insured team with decades of experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full mt-3 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Ongoing Support</h4>
                  <p className="text-lg text-gray-700 leading-relaxed">24/7 monitoring and maintenance to ensure peak performance</p>
                </div>
              </div>
            </div>

            {/* Premium CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative mt-12 px-10 py-5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center overflow-hidden"
            >
              {/* Button Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur-lg opacity-60 group-hover/btn:opacity-80 transition-opacity duration-500"></div>
              
              <div className="relative flex items-center gap-3">
                <span>Learn More About Our Company</span>
                <svg className="w-6 h-6 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-orange-200 overflow-hidden"
              >
                {/* Enterprise Card Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-red-50/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Premium Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Enhanced Icon Container */}
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-2xl mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <div className="text-white">
                      {achievement.icon}
                    </div>
                    <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-sm"></div>
                  </div>
                  
                  {/* Premium Typography */}
                  <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-base text-gray-700 leading-relaxed font-medium">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Advance Power Redding?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">25+</div>
                <div className="text-gray-300">Years of Experience</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">1,000+</div>
                <div className="text-gray-300">Satisfied Customers</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">24/7</div>
                <div className="text-gray-300">Support & Monitoring</div>
              </div>
            </div>

            <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto">
              From initial consultation to ongoing maintenance, we're with you every step 
              of your solar journey. Contact us today to start saving with clean energy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Get Your Free Quote
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-gray-300 text-gray-300 font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Call (530) 226-0701
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAdvancePowerSection;