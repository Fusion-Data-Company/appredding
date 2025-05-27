import { motion } from "framer-motion";
import { Link } from "wouter";
import { SOLAR_HERO_IMAGE } from "@/assets_dir/imageExports";

const SolarHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enterprise Elite Background with Neural Network Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.92) 25%, rgba(51, 65, 85, 0.88) 50%, rgba(71, 85, 105, 0.85) 75%, rgba(100, 116, 139, 0.82) 100%), url(${SOLAR_HERO_IMAGE})`
        }}
      />
      
      {/* Elite Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10"></div>
      </div>
      
      {/* Animated Premium Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-yellow-400/20 via-orange-500/15 to-amber-600/10 rounded-full blur-xl animate-pulse shadow-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-orange-500/20 via-red-500/15 to-yellow-600/10 rounded-full blur-2xl animate-pulse delay-1000 shadow-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/8 via-orange-500/6 to-amber-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Elite Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-lg rotate-45 animate-bounce shadow-xl backdrop-blur-sm border border-yellow-400/20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full animate-pulse delay-700 shadow-xl backdrop-blur-sm border border-orange-400/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                Solar Power
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl -z-10 animate-pulse"></div>
            </span>
            <br />
            <span className="relative inline-block text-white drop-shadow-2xl">
              Solutions
              <div className="absolute -inset-1 bg-white/10 blur-lg -z-10"></div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            North State's leader in renewable energy design, installation, service & technical expertise for over 20 years
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Free Solar Quote
              </motion.button>
            </Link>
            
            <Link href="#services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-300 text-gray-300 font-bold rounded-lg text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Our Services
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">20+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="text-3xl font-bold text-orange-400 mb-2">1000+</div>
            <div className="text-gray-300">Solar Installations</div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="text-3xl font-bold text-red-400 mb-2">24/7</div>
            <div className="text-gray-300">Support & Service</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarHeroSection;