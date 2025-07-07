import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { BarChart3, Zap, Shield, Thermometer, Battery, Settings, FileText, Calculator } from "lucide-react";

// Lazy load technical sections
const SpecificationsSection = lazy(() => import("@/sections/SpecificationsSection"));
const TroubleshootingSection = lazy(() => import("@/sections/TroubleshootingSection"));
const PowerFlowSection = lazy(() => import("@/sections/PowerFlowSection"));
const EnergyStorageSection = lazy(() => import("@/sections/EnergyStorageSection"));
const InteractiveToolsSection = lazy(() => import("@/sections/InteractiveToolsSection").then(m => ({ default: m.InteractiveToolsSection })));

const TechnicalData = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        {/* Hero Section */}
        <div className="relative py-20 px-4 text-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-blue-900/20 to-orange-900/20"></div>
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Technical
                </span>{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  Data
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Comprehensive technical specifications, performance data, and engineering resources for solar energy systems
              </p>
              
              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <motion.a
                  href="#specifications"
                  className="p-4 bg-gray-800/50 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-6 h-6 text-orange-400 mx-auto mb-2 group-hover:text-orange-300" />
                  <span className="text-sm text-gray-300 group-hover:text-white">Specifications</span>
                </motion.a>
                
                <motion.a
                  href="#power-flow"
                  className="p-4 bg-gray-800/50 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:text-blue-300" />
                  <span className="text-sm text-gray-300 group-hover:text-white">Power Flow</span>
                </motion.a>
                
                <motion.a
                  href="#energy-storage"
                  className="p-4 bg-gray-800/50 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Battery className="w-6 h-6 text-green-400 mx-auto mb-2 group-hover:text-green-300" />
                  <span className="text-sm text-gray-300 group-hover:text-white">Storage</span>
                </motion.a>
                
                <motion.a
                  href="#tools"
                  className="p-4 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calculator className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:text-purple-300" />
                  <span className="text-sm text-gray-300 group-hover:text-white">Tools</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Sections */}
        <div className="space-y-16">
          {/* Specifications Section */}
          <section id="specifications">
            <Suspense fallback={<div className="h-[600px] bg-gray-800/30 animate-pulse rounded-lg mx-4" />}>
              <SpecificationsSection />
            </Suspense>
          </section>

          {/* Power Flow Section */}
          <section id="power-flow">
            <Suspense fallback={<div className="h-[500px] bg-gray-800/30 animate-pulse rounded-lg mx-4" />}>
              <PowerFlowSection />
            </Suspense>
          </section>

          {/* Energy Storage Section */}
          <section id="energy-storage">
            <Suspense fallback={<div className="h-[500px] bg-gray-800/30 animate-pulse rounded-lg mx-4" />}>
              <EnergyStorageSection />
            </Suspense>
          </section>

          {/* Interactive Tools Section */}
          <section id="tools">
            <Suspense fallback={<div className="h-[600px] bg-gray-800/30 animate-pulse rounded-lg mx-4" />}>
              <InteractiveToolsSection />
            </Suspense>
          </section>

          {/* Troubleshooting Section */}
          <section id="troubleshooting">
            <Suspense fallback={<div className="h-[400px] bg-gray-800/30 animate-pulse rounded-lg mx-4" />}>
              <TroubleshootingSection />
            </Suspense>
          </section>
        </div>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </MainLayout>
  );
};

export default TechnicalData;