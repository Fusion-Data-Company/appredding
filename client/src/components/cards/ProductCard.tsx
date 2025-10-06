import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info, Star } from 'lucide-react';
import { Link } from 'wouter';

interface ProductCardProps {
  image?: string;
  title: string;
  price: string | number;
  originalPrice?: string | number;
  features?: string[];
  rating?: number;
  reviewCount?: number;
  badge?: string;
  link?: string;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  originalPrice,
  features = [],
  rating,
  reviewCount,
  badge,
  link,
  onAddToCart,
  onViewDetails,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-orange-500/30 ${className}`}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}
      
      {image && (
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        
        {rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
            {reviewCount && (
              <span className="text-sm text-gray-400">({reviewCount})</span>
            )}
          </div>
        )}
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            ${typeof price === 'number' ? price.toFixed(2) : price}
          </span>
          {originalPrice && (
            <span className="text-gray-500 line-through">
              ${typeof originalPrice === 'number' ? originalPrice.toFixed(2) : originalPrice}
            </span>
          )}
        </div>
        
        {features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-400 flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        <div className="flex gap-2">
          {onAddToCart && (
            <Button
              onClick={onAddToCart}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          )}
          
          {link ? (
            <Link href={link}>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Info className="w-4 h-4 mr-2" />
                Details
              </Button>
            </Link>
          ) : onViewDetails ? (
            <Button
              onClick={onViewDetails}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Info className="w-4 h-4 mr-2" />
              Details
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;