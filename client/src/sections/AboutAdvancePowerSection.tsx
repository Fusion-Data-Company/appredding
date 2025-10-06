import { motion } from "framer-motion";
import { Award, Users, Calendar, Shield, Zap, CheckCircle, Star, Badge, Settings, Battery, Wifi, Wrench, FileCheck } from "lucide-react";

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
      number: "500+",
      label: "Installations",
      description: "Residential and commercial projects"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      number: "100%",
      label: "Customer Satisfaction",
      description: "5-star reviews and referrals"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "A+",
      label: "BBB Rating",
      description: "Licensed, bonded, and insured"
    }
  ];

  const certifications = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Solar Installer",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Fully Licensed & Bonded",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Certified",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Insured & Protected",
      color: "text-red-400",
      bgColor: "bg-red-500/20"
    },
    {
      icon: <Badge className="w-6 h-6" />,
      title: "Professional Standards",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Local Expertise",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Quality Guaranteed",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20"
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 overflow-hidden">
      {/* Solar Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-orange-200/15 to-amber-200/20"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-yellow-300/15 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-orange-300/15 to-amber-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Solar Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1"/>
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
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-12 leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">About</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                Advance Power
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/40 to-amber-300/40 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl max-w-5xl mx-auto font-bold leading-relaxed drop-shadow-sm"
             style={{ color: '#000000 !important' }}>
            Northern California's trusted solar energy partner, delivering premium installation services 
            and exceptional customer care for over two decades.
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
              <div className="relative bg-gradient-to-br from-white via-yellow-50 to-orange-50 backdrop-blur-sm rounded-3xl p-8 border-2 border-yellow-200 group-hover:border-orange-400 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden text-center">
                
                {/* Card Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/30 via-red-500/30 to-amber-500/30 opacity-20 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Premium Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 border-orange-300">
                    {achievement.icon}
                  </div>

                  {/* Enhanced Number */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-500 group-hover:bg-clip-text transition-all duration-300 drop-shadow-md">
                    {achievement.number}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {achievement.label}
                  </h3>

                  <p className="text-gray-600 text-sm font-medium">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Green Savings Highlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 border-2 border-green-400 shadow-2xl overflow-hidden">
            {/* Green glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 blur-xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
                Your Complete Solar Solution
              </h3>
              <p className="text-2xl text-orange-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                We provide comprehensive solar energy systems that power your home or business reliably and efficiently, 
                backed by industry-leading warranties and expert local support.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">25+</div>
                  <div className="text-orange-200">Years of Service</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-orange-200">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-orange-200">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
                Since 1999, Advance Power Redding has been Northern California's trusted solar energy partner. 
                We've helped hundreds of families and businesses achieve energy independence with custom solar 
                solutions designed for their unique needs.
              </p>
              
              <p>
                Our team of certified professionals takes pride in delivering exceptional service from your 
                first consultation through installation and beyond. We handle every aspect of your solar 
                project with precision and care, ensuring a seamless experience.
              </p>
              
              <p>
                As a locally owned and operated company, we're committed to our community and your satisfaction. 
                Our A+ BBB rating and hundreds of 5-star reviews reflect our dedication to quality work and 
                outstanding customer service.
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
            
            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group relative overflow-hidden"
                >
                  {/* Premium Badge Container */}
                  <div className={`relative ${cert.bgColor} backdrop-blur-sm rounded-xl p-4 border border-gray-600/30 group-hover:border-gray-500/50 shadow-lg hover:shadow-xl transition-all duration-300`}>
                    
                    {/* Glow Effect */}
                    <div className={`absolute -inset-1 ${cert.bgColor} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-xl`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center">
                      {/* Premium Icon Badge */}
                      <div className={`inline-flex items-center justify-center w-12 h-12 ${cert.bgColor} rounded-xl mr-4 ${cert.color} shadow-lg group-hover:scale-110 transition-transform duration-300 border border-gray-600/20`}>
                        {cert.icon}
                      </div>
                      
                      {/* Certification Text */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                          {cert.title}
                        </h4>
                      </div>
                      
                      {/* Verification Badge */}
                      <div className="flex items-center">
                        <Badge className="w-5 h-5 text-orange-400 ml-2" />
                        <span className="text-xs text-orange-400 ml-1 font-medium">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl border border-emerald-600/30 relative overflow-hidden">
              {/* Premium background effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-xl opacity-70"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-xl mr-4 text-emerald-400 shadow-lg border border-emerald-600/20">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">License & Insurance Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>CSLB License #942090</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Bonded & Insured</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Workers' Compensation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>General Liability Insurance</span>
                  </div>
                </div>
              </div>
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