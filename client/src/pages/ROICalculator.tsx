import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ROICalculatorComponent from '@/components/ROICalculator';
import { UtilitySavingsCalculator } from '@/components/UtilitySavingsCalculator';
import { motion } from 'framer-motion';
import { SOLAR_PANELS_HERO_IMAGE } from '@/assets_dir/imageExports';
import { GradientHeading } from '@/components/ui/gradient-heading';

const ROICalculator = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 md:pt-24 md:pb-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 20, 0.9), rgba(0, 0, 20, 0.7)), url(${SOLAR_PANELS_HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GradientHeading level={1} className="text-4xl sm:text-5xl md:text-6xl mb-6" variant="mixed">
                ROI Calculator
              </GradientHeading>
              <p className="text-xl text-gray-300 mb-8">
                NEM 3.0 load shifting recovers 25-40% of lost export value. Avoid $250/night hotel costs during PSPS events. Real calculations based on current Shasta County rates and SGIP incentives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <ROICalculatorComponent />
        <div className="mt-12">
          <UtilitySavingsCalculator />
        </div>
      </div>
    </MainLayout>
  );
};

export default ROICalculator;