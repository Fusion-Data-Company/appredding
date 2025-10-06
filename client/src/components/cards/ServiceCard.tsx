import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode | LucideIcon;
  title: string;
  description: string;
  link?: string;
  features?: string[];
  highlight?: boolean;
  accentColor?: 'orange' | 'blue' | 'green' | 'purple';
  onClick?: () => void;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  link,
  features = [],
  highlight = false,
  accentColor = 'orange',
  onClick,
  className = ''
}) => {
  const accentStyles = {
    orange: {
      icon: 'text-green-400',
      iconBg: 'bg-green-500/10',
      border: 'border-orange-500/30',
      button: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      highlight: 'from-orange-500/10 to-orange-600/10'
    },
    blue: {
      icon: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      button: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      highlight: 'from-blue-500/10 to-blue-600/10'
    },
    green: {
      icon: 'text-green-400',
      iconBg: 'bg-green-500/10',
      border: 'border-green-500/30',
      button: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      highlight: 'from-green-500/10 to-green-600/10'
    },
    purple: {
      icon: 'text-purple-400',
      iconBg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      button: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      highlight: 'from-purple-500/10 to-purple-600/10'
    }
  };

  const accent = accentStyles[accentColor];

  const cardContent = (
    <>
      <div className={`inline-flex p-4 rounded-xl ${accent.iconBg} mb-6`}>
        <div className={accent.icon}>
          {React.isValidElement(icon) 
            ? icon 
            : React.createElement(icon as LucideIcon, { className: 'w-8 h-8' })
          }
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-400 mb-4">
        {description}
      </p>
      
      {features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-400 flex items-start">
              <span className={accent.icon + ' mr-2 mt-0.5'}>•</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-auto">
        <Button 
          className={`w-full bg-gradient-to-r ${accent.button} text-white font-semibold`}
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );

  const cardClass = `
    relative h-full p-8 rounded-2xl transition-all duration-300 flex flex-col
    ${highlight 
      ? `bg-gradient-to-br ${accent.highlight} border ${accent.border} shadow-2xl` 
      : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70'
    }
    backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:border-opacity-50
    ${className}
  `;

  if (link) {
    return (
      <Link href={link}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          className={cardClass}
        >
          {cardContent}
        </motion.div>
      </Link>
    );
  }

  if (onClick) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        onClick={onClick}
        className={`cursor-pointer ${cardClass}`}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cardClass}
    >
      {cardContent}
    </motion.div>
  );
};

export default ServiceCard;