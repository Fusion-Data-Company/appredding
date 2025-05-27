import { motion } from "framer-motion";
import { Award, Users, Calendar, Shield, Zap, CheckCircle } from "lucide-react";

const AboutAdvancePowerSection = () => {
  const achievements = [
    {
      icon: <Calendar className="w-8 h-8" />,
      number: "25+",
      label: "Years Experience",
      description: "Serving Northern California since 1999"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "1,500+",
      label: "Happy Customers",
      description: "Families and businesses powered by solar"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      number: "5,000+",
      label: "Systems Installed",
      description: "Megawatts of clean energy generated"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "98%",
      label: "Customer Satisfaction",
      description: "Industry-leading service ratings"
    }
  ];

  const certifications = [
    "NABCEP Certified",
    "CSLB Licensed",
    "Tesla Certified Installer",
    "Better Business Bureau A+",
    "Solar Power World Top Contractor",
    "SunPower Elite Dealer"
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
      {/* Enterprise Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-purple-500/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enterprise Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
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
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-12 leading-tight">
            About{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Advance Power
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-200 max-w-5xl mx-auto font-light leading-relaxed">
            Northern California's most trusted solar experts, delivering clean energy solutions 
            for over 25 years with unmatched expertise and customer service.
          </p>
        </motion.div>

        {/* Enterprise Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {achievements.map((achievement, index) => (
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
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-500 overflow-hidden text-center">
                
                {/* Card Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Premium Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>

                  {/* Enhanced Number */}
                  <div className="text-5xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {achievement.number}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-300 mb-2">
                    {achievement.label}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24"
        >
          {/* Story Content */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8">
              Our Story
            </h3>
            
            <div className="space-y-6 text-xl text-gray-300 leading-relaxed">
              <p>
                Founded in 1999 by Greg Peterson, Advance Power began as a small electrical contracting 
                company in Redding, California. As solar technology emerged, we recognized the incredible 
                potential for clean, renewable energy in Northern California.
              </p>
              
              <p>
                Over the past 25 years, we've evolved into the region's most trusted solar installation 
                and maintenance company. Our commitment to quality workmanship, cutting-edge technology, 
                and exceptional customer service has earned us thousands of satisfied customers.
              </p>
              
              <p>
                Today, Advance Power continues to lead the way in solar innovation, helping families and 
                businesses achieve energy independence while reducing their environmental impact.
              </p>
            </div>

            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-xl text-lg shadow-2xl transition-all duration-300 hover:shadow-3xl"
              >
                Learn More About Us
              </motion.button>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8">
              Certifications & Awards
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center text-xl text-gray-300"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                  {cert}
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-blue-500 mr-4" />
                <h4 className="text-2xl font-bold text-white">Fully Licensed & Insured</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                CSLB License #942090 | Bonded & Insured | Workers' Compensation Coverage | 
                General Liability Insurance | All work backed by comprehensive warranties.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-16 border border-gray-700/50 overflow-hidden">
            
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-5xl md:text-6xl font-black text-white mb-8">
                Ready to Join Our Family?
              </h3>
              
              <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Experience the Advance Power difference. Get your free solar consultation 
                and discover why thousands of customers trust us with their energy future.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-black rounded-xl text-xl shadow-2xl transition-all duration-300 hover:shadow-3xl"
                >
                  Get Free Consultation
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 border-2 border-gray-400 text-gray-200 font-black rounded-xl text-xl hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Call (530) 226-0701
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAdvancePowerSection;