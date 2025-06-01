import { MobileWrapper } from '@/components/MobileLayout';
import { MobileNavigation } from '@/components/MobileNavigation';
import { MobileHero } from '@/components/MobileHero';
import { MobileServices } from '@/components/MobileServices';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const MobileContact = () => (
  <section className="mobile-section">
    <div className="text-center mb-6">
      <h2 className="mobile-text-2xl font-bold text-white mb-2">Get in Touch</h2>
      <p className="mobile-text-sm text-gray-400">Ready to start your solar journey?</p>
    </div>

    <div className="space-y-4">
      <div className="mobile-card">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-5 h-5 text-orange-400" />
          <span className="mobile-text-lg font-semibold text-white">Call Us</span>
        </div>
        <a href="tel:+1234567890" className="mobile-btn mobile-btn-primary w-full">
          (123) 456-7890
        </a>
      </div>

      <div className="mobile-card">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-orange-400" />
          <span className="mobile-text-lg font-semibold text-white">Email Us</span>
        </div>
        <a href="mailto:info@solarpro.com" className="mobile-btn mobile-btn-secondary w-full">
          info@solarpro.com
        </a>
      </div>

      <div className="mobile-card">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-5 h-5 text-orange-400" />
          <span className="mobile-text-lg font-semibold text-white">Visit Us</span>
        </div>
        <p className="mobile-text-sm text-gray-300 mb-3">
          123 Solar Street<br />
          Energy City, CA 90210
        </p>
        <button className="mobile-btn mobile-btn-secondary w-full">
          Get Directions
        </button>
      </div>

      <div className="mobile-card">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-orange-400" />
          <span className="mobile-text-lg font-semibold text-white">Hours</span>
        </div>
        <div className="space-y-1 mobile-text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>9:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MobileStats = () => (
  <section className="mobile-section bg-gradient-to-br from-orange-900/20 to-blue-900/20">
    <div className="text-center mb-6">
      <h2 className="mobile-text-2xl font-bold text-white mb-2">Our Impact</h2>
      <p className="mobile-text-sm text-gray-400">Making a difference with solar energy</p>
    </div>

    <div className="mobile-grid mobile-grid-2 gap-4">
      {[
        { value: '2,500+', label: 'Installations' },
        { value: '50MW+', label: 'Solar Capacity' },
        { value: '25M+', label: 'kWh Generated' },
        { value: '15K+', label: 'Tons CO₂ Saved' }
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mobile-card text-center"
        >
          <div className="mobile-text-2xl font-bold text-orange-400 mb-1">
            {stat.value}
          </div>
          <div className="mobile-text-sm text-gray-300">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default function MobileHome() {
  return (
    <MobileWrapper>
      <MobileNavigation />
      <div className="pt-20">
        <MobileHero />
        <MobileServices />
        <MobileStats />
        <MobileContact />
      </div>
    </MobileWrapper>
  );
}