import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
  image?: string;
  highlight?: boolean;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  rating = 5,
  image,
  highlight = false,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`
        relative p-8 rounded-2xl transition-all duration-300
        ${highlight 
          ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 shadow-2xl' 
          : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70'
        }
        backdrop-blur-sm hover:shadow-xl
        ${className}
      `}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-orange-400/20">
        <Quote className="w-12 h-12" />
      </div>
      
      {/* Rating Stars */}
      {rating > 0 && (
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-600'
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Quote Text */}
      <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
        "{quote}"
      </blockquote>
      
      {/* Author Info */}
      <div className="flex items-center gap-4">
        {image && (
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 p-0.5">
            <img 
              src={image} 
              alt={author}
              className="w-full h-full rounded-full object-cover bg-gray-900"
            />
          </div>
        )}
        
        <div>
          <p className="font-semibold text-white">
            {author}
          </p>
          {(role || company) && (
            <p className="text-sm text-gray-400">
              {role}{role && company && ', '}{company}
            </p>
          )}
        </div>
      </div>
      
      {/* Highlight Glow Effect */}
      {highlight && (
        <>
          <div className="absolute -inset-4 bg-orange-500/20 rounded-2xl blur-xl opacity-50 animate-pulse-slow -z-10"></div>
          <div className="absolute -inset-8 bg-orange-600/10 rounded-2xl blur-2xl opacity-30 -z-20"></div>
        </>
      )}
    </motion.div>
  );
};

export default TestimonialCard;