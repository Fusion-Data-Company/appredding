import { motion } from "framer-motion";
import { Link } from "wouter";
import { SOLAR_HERO_IMAGE } from "@/assets_dir/imageExports";

const SolarHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-orange-100">
      {/* Clean Professional Background */}
      <div className="absolute inset-0">
        {/* Bright Solar Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/90 via-amber-50/85 to-orange-100/80"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(251, 191, 36, 0.15)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        
        {/* Floating Solar Energy Effects */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-yellow-300/20 to-orange-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-300/10 to-yellow-400/8 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Sophisticated Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 via-orange-500/10 via-transparent to-red-500/12"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="enterprise-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(251, 191, 36, 0.08)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#enterprise-grid)" />
        </svg>
      </div>
      
      {/* Premium Animated Particles System */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Energy Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-yellow-400/25 via-orange-500/20 to-amber-600/15 rounded-full blur-xl animate-pulse shadow-2xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-orange-500/25 via-red-500/20 to-yellow-600/15 rounded-full blur-2xl animate-pulse delay-1000 shadow-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-yellow-500/12 via-orange-500/8 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Secondary Accent Orbs */}
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-yellow-500/15 rounded-full blur-lg animate-pulse delay-300 shadow-xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-600/15 rounded-full blur-lg animate-pulse delay-800 shadow-xl"></div>
        
        {/* Floating Solar Panel Elements */}
        
        {/* Large Solar Panel - Top Right */}
        <div className="absolute top-16 right-20 w-40 h-24 bg-gradient-to-br from-blue-900/15 to-blue-700/10 border border-blue-500/30 rounded-lg rotate-12 animate-pulse shadow-2xl">
          <div className="grid grid-cols-5 grid-rows-3 gap-0.5 p-2 h-full">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="bg-blue-800/20 rounded-sm border border-blue-600/20"></div>
            ))}
          </div>
        </div>

        {/* Medium Solar Panel - Left Side */}
        <div className="absolute top-1/3 left-12 w-32 h-20 bg-gradient-to-br from-blue-900/20 to-blue-700/10 border border-blue-500/25 rounded-lg -rotate-6 animate-pulse delay-1000 shadow-xl">
          <div className="grid grid-cols-4 grid-rows-2 gap-0.5 p-1.5 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-blue-800/15 rounded-sm border border-blue-600/15"></div>
            ))}
          </div>
        </div>

        {/* Small Solar Panel - Bottom Left */}
        <div className="absolute bottom-32 left-24 w-24 h-16 bg-gradient-to-br from-blue-900/20 to-blue-700/10 border border-blue-500/30 rounded-md rotate-3 animate-pulse delay-2000 shadow-xl">
          <div className="grid grid-cols-3 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-blue-800/20 rounded-sm border border-blue-600/20"></div>
            ))}
          </div>
        </div>

        {/* Solar Panel - Right Side */}
        <div className="absolute bottom-40 right-28 w-36 h-22 bg-gradient-to-br from-blue-900/15 to-blue-700/10 border border-blue-500/25 rounded-lg -rotate-12 animate-pulse delay-500 shadow-xl">
          <div className="grid grid-cols-4 grid-rows-2 gap-0.5 p-1.5 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-blue-800/15 rounded-sm border border-blue-600/15"></div>
            ))}
          </div>
        </div>

        {/* Additional Solar Panels */}
        <div className="absolute top-1/2 right-12 w-28 h-18 bg-gradient-to-br from-blue-900/10 to-blue-700/5 border border-blue-500/20 rounded-lg rotate-6 animate-pulse delay-1500 shadow-lg">
          <div className="grid grid-cols-3 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-blue-800/10 rounded-sm border border-blue-600/10"></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/3 w-20 h-14 bg-gradient-to-br from-blue-900/15 to-blue-700/10 border border-blue-500/25 rounded-md -rotate-3 animate-pulse delay-800 shadow-lg">
          <div className="grid grid-cols-2 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-blue-800/15 rounded-sm border border-blue-600/15"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Clean, Professional Hero Headline */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
              <span className="block text-gray-900 mb-4">
                Advance Power
              </span>
              <span className="block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Solar Solutions
              </span>
            </h1>
            
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed">
                Redding's trusted solar experts with over 20 years of experience. 
                Professional installation, repair, and maintenance services for homes and businesses.
              </p>
            </div>
            
            {/* Company Credentials */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-orange-700 font-medium mb-10">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>1000+ Installations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>A+ BBB Rating</span>
              </div>
            </div>
          </div>
          
          {/* Premium Subtitle with Enhanced Typography */}
          <div className="relative mb-10">
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
              North State's leader in renewable energy design, installation, service & technical expertise
            </p>
            <div className="flex items-center justify-center gap-4 text-lg md:text-xl text-orange-700 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                <span>20+ Years Experience</span>
              </div>
              <div className="w-1 h-6 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse delay-500"></div>
                <span>1000+ Installations</span>
              </div>
            </div>
          </div>
          
          {/* Professional Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="#contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Free Solar Quote
              </motion.button>
            </Link>
            
            <Link href="#services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white/80 backdrop-blur-sm border-2 border-orange-300 text-gray-800 font-bold rounded-xl text-lg hover:bg-white hover:border-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Services
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Company Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {/* Years Experience Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4 border border-yellow-400/30">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-3 leading-none">20+</div>
              <div className="text-xl text-gray-200 font-medium">Years Experience</div>
              <div className="text-sm text-gray-400 mt-2">Serving Northern California since 2004</div>
            </div>
          </motion.div>
          
          {/* Solar Installations Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 border border-orange-400/30">
                <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <div className="text-4xl md:text-5xl font-black text-orange-400 mb-3 leading-none">1000+</div>
              <div className="text-xl text-gray-200 font-medium">Solar Installations</div>
              <div className="text-sm text-gray-400 mt-2">Residential & commercial projects</div>
            </div>
          </motion.div>
          
          {/* Support & Service Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4 border border-red-400/30">
                <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="text-4xl md:text-5xl font-black text-red-400 mb-3 leading-none">24/7</div>
              <div className="text-xl text-gray-200 font-medium">Support & Service</div>
              <div className="text-sm text-gray-400 mt-2">Emergency repairs & maintenance</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarHeroSection;