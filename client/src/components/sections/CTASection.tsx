import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { GradientTracing } from '@/components/ui/gradient-tracing';
import { Phone, Mail, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'wouter';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryButton?: {
    text: string;
    link?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryButton?: {
    text: string;
    link?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  showContactInfo?: boolean;
  phoneNumber?: string;
  email?: string;
  backgroundColor?: string;
  accentColor?: 'orange' | 'blue';
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  showContactInfo = true,
  phoneNumber = '(530) 226-0701',
  email = 'info@apredding.net',
  backgroundColor = 'bg-gradient-to-br from-gray-900 to-black',
  accentColor = 'orange'
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const accentStyles = {
    orange: {
      gradient: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      text: 'text-orange-400',
      border: 'border-orange-500',
      hover: 'hover:bg-orange-500'
    },
    blue: {
      gradient: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      text: 'text-blue-400',
      border: 'border-blue-500',
      hover: 'hover:bg-blue-500'
    }
  };

  const accent = accentStyles[accentColor];

  return (
    <section ref={ref} className={`py-20 relative overflow-hidden ${backgroundColor}`}>
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <GradientTracing
          gradientColors={["#f97316", "#fb923c", "#3b82f6"]}
          animationDuration={3.5}
          strokeWidth={2}
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {title}
          </motion.h2>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            {primaryButton && (
              primaryButton.link ? (
                <Link href={primaryButton.link}>
                  <Button 
                    size="lg"
                    className={`bg-gradient-to-r ${accent.gradient} text-white font-bold py-4 px-8 text-lg shadow-lg transform transition hover:scale-105`}
                  >
                    {primaryButton.icon || <Calendar className="mr-2 h-5 w-5" />}
                    {primaryButton.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg"
                  onClick={primaryButton.onClick}
                  className={`bg-gradient-to-r ${accent.gradient} text-white font-bold py-4 px-8 text-lg shadow-lg transform transition hover:scale-105`}
                >
                  {primaryButton.icon || <Calendar className="mr-2 h-5 w-5" />}
                  {primaryButton.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )
            )}
            
            {secondaryButton && (
              secondaryButton.link ? (
                <Link href={secondaryButton.link}>
                  <Button 
                    size="lg"
                    variant="outline"
                    className={`${accent.border} ${accent.text} ${accent.hover} hover:text-white py-4 px-8 text-lg`}
                  >
                    {secondaryButton.icon}
                    {secondaryButton.text}
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={secondaryButton.onClick}
                  className={`${accent.border} ${accent.text} ${accent.hover} hover:text-white py-4 px-8 text-lg`}
                >
                  {secondaryButton.icon}
                  {secondaryButton.text}
                </Button>
              )
            )}
          </motion.div>
          
          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-400"
            >
              <a href={`tel:${phoneNumber.replace(/[^\d]/g, '')}`} className="flex items-center hover:text-white transition">
                <Phone className="w-5 h-5 mr-2" />
                <span>{phoneNumber}</span>
              </a>
              <span className="hidden sm:inline">•</span>
              <a href={`mailto:${email}`} className="flex items-center hover:text-white transition">
                <Mail className="w-5 h-5 mr-2" />
                <span>{email}</span>
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;