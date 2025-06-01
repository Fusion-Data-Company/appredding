import { motion } from 'framer-motion';
import { Zap, Battery, Sun, Shield } from 'lucide-react';

export const MobileHero = () => {
  return (
    <section className="mobile-hero mobile-safe-area">
      <div className="mobile-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full border border-orange-500/30 mb-4">
              <Sun className="w-10 h-10 text-orange-400" />
            </div>
          </div>
          
          <h1 className="mobile-hero-title">
            Advanced Solar
            <br />
            Energy Solutions
          </h1>
          
          <p className="mobile-hero-subtitle mb-8">
            Transform your energy future with cutting-edge solar technology and smart battery storage systems.
          </p>
          
          <div className="space-y-4">
            <button className="mobile-btn mobile-btn-primary w-full">
              Get Free Quote
            </button>
            
            <button className="mobile-btn mobile-btn-secondary w-full">
              View Solutions
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <div className="mobile-grid mobile-grid-2 gap-4">
            {[
              { icon: Zap, label: 'Smart Solar', value: '25+ Years' },
              { icon: Battery, label: 'Energy Storage', value: '24/7 Power' },
              { icon: Sun, label: 'Clean Energy', value: '100% Green' },
              { icon: Shield, label: 'Protected', value: 'Guaranteed' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mobile-card text-center py-4"
              >
                <item.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="mobile-text-xs text-gray-400 mb-1">{item.label}</div>
                <div className="mobile-text-sm font-bold text-white">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};