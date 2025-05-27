import { Button } from "@/components/ui/button";
import { Phone, Zap, Battery, Sun } from "lucide-react";

const SolarHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-25"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center min-h-screen">
        {/* Content */}
        <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/advance-power-logo.jpg" 
              alt="Advance Power Redding" 
              className="h-20 mx-auto lg:mx-0 rounded-lg shadow-lg"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">Energy Freedom</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Begins Here!
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
            Advance Power Redding provides expert solar solutions, battery care, and energy-saving services to help reduce costs and improve efficiency
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-yellow-600">20+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-orange-600">1000+</div>
              <div className="text-sm text-gray-600">Installations</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-blue-600">Licensed</div>
              <div className="text-sm text-gray-600">Professionals</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: (530) 226-0701
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg">
              Get Free Quote
            </Button>
          </div>

          {/* Energy Storage CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto lg:mx-0">
            <div className="flex items-center mb-2">
              <Battery className="w-6 h-6 mr-2" />
              <span className="font-semibold">Family Energy Storage System</span>
            </div>
            <p className="text-blue-100 mb-3">Gather, store, and use power – your way!</p>
            <Button variant="secondary" className="w-full">
              Learn More About Energy Storage
            </Button>
          </div>
        </div>

        {/* Visual Elements */}
        <div className="flex-1 relative">
          <div className="relative w-full max-w-lg mx-auto">
            {/* Solar Panel Illustration */}
            <div className="relative">
              <div className="w-80 h-64 bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg shadow-2xl transform rotate-3 mx-auto">
                <div className="grid grid-cols-4 gap-1 p-4 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-gradient-to-br from-blue-600 to-blue-700 rounded border border-blue-500"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Sun Icon */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sun className="w-8 h-8 text-yellow-800" />
              </div>

              {/* Energy Flow Lines */}
              <div className="absolute top-1/2 -right-12 flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i}
                    className="w-8 h-1 bg-yellow-400 rounded-full opacity-60"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>
                ))}
              </div>

              {/* Battery Icon */}
              <div className="absolute -bottom-6 -left-6 w-12 h-16 bg-green-500 rounded-md flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default SolarHeroSection;