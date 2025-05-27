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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Advance Power</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Founded in 1999 by Greg Tomsik, Advance Power Redding has been Northern California's 
              trusted leader in renewable energy solutions for over two decades.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We specialize in residential and commercial solar installations, hybrid systems with 
              battery storage, and comprehensive energy conservation services. Our team of certified 
              professionals is committed to helping you achieve energy independence while reducing 
              your carbon footprint.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Solar Design</h4>
                  <p className="text-gray-600">Every system is uniquely designed for maximum efficiency and savings</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Professional Installation</h4>
                  <p className="text-gray-600">Licensed, bonded, and insured team with decades of experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                  <p className="text-gray-600">24/7 monitoring and maintenance to ensure peak performance</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Learn More About Our Company
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mb-4 mx-auto">
                  <div className="text-white">
                    {achievement.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>
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