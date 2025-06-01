import { motion } from 'framer-motion';
import { Zap, Battery, Home, Building, Wrench, Shield } from 'lucide-react';

export const MobileServices = () => {
  const services = [
    {
      icon: Zap,
      title: 'Residential Solar',
      description: 'Complete home solar solutions with smart monitoring and grid-tie capabilities.',
      features: ['25-year warranty', 'Smart monitoring', 'Grid integration']
    },
    {
      icon: Battery,
      title: 'Battery Storage',
      description: 'Advanced lithium battery systems for 24/7 energy independence.',
      features: ['LiFePO4 technology', 'Backup power', 'Energy arbitrage']
    },
    {
      icon: Building,
      title: 'Commercial Solar',
      description: 'Large-scale solar installations for businesses and industrial facilities.',
      features: ['Tax incentives', 'ROI optimization', 'Peak shaving']
    },
    {
      icon: Home,
      title: 'Hybrid Systems',
      description: 'Combined solar and battery solutions for maximum energy efficiency.',
      features: ['Seamless integration', 'Load management', 'Energy optimization']
    },
    {
      icon: Wrench,
      title: 'Maintenance',
      description: 'Professional maintenance and monitoring services for optimal performance.',
      features: ['Regular inspections', 'Performance monitoring', 'Rapid response']
    },
    {
      icon: Shield,
      title: 'Protection',
      description: 'Comprehensive warranties and insurance coverage for your investment.',
      features: ['Full coverage', 'Performance guarantee', 'Peace of mind']
    }
  ];

  return (
    <section className="mobile-section">
      <div className="text-center mb-8">
        <h2 className="mobile-text-3xl font-bold text-white mb-4">
          Our Solar Solutions
        </h2>
        <p className="mobile-text-base text-gray-300">
          Comprehensive energy solutions tailored for your needs
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mobile-card"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-lg border border-orange-500/30 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="mobile-card-title">{service.title}</h3>
                <p className="mobile-card-content mb-3">{service.description}</p>
                
                <div className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                      <span className="mobile-text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="mobile-btn mobile-btn-primary mt-4 w-full mobile-text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};