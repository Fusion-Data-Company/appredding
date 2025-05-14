import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingBag, Minus, Plus, CircleDollarSign, Box, ShieldCheck, Droplets } from 'lucide-react';
import { Product, useStore } from '@/contexts/StoreContext';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/premium-button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Animation variants
  const hoverAnimation = {
    rest: { 
      y: 0, 
      boxShadow: "0 10px 50px rgba(251, 191, 36, 0.2)" 
    },
    hover: { 
      y: -10, 
      boxShadow: "0 20px 60px -5px rgba(251, 191, 36, 0.3), 0 10px 32px -8px rgba(251, 191, 36, 0.2)" 
    }
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate={isHovered ? "hover" : "rest"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={hoverAnimation}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden relative bg-gray-800/60 backdrop-blur-xl rounded-xl shadow-[0_10px_50px_rgba(251,191,36,0.2)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.4)] border-0 premium-gradient-border">
        {/* Metallic effect header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>
        
        {/* Animated glow on hover */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-amber-300/5 to-amber-500/10 dark:from-amber-400/10 dark:via-amber-500/5 dark:to-amber-600/15"></div>
          <div className="absolute -top-10 -bottom-10 left-0 right-0 bg-amber-300/10 dark:bg-amber-700/10 blur-3xl transform translate-y-12"></div>
        </motion.div>
        
        {/* Product Size Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/60 dark:to-amber-800/60 text-amber-900 dark:text-amber-200 border border-amber-200/60 dark:border-amber-700/30 shadow-[0_2px_6px_rgba(251,191,36,0.15)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
          >
            {product.size}
          </Badge>
        </div>
        
        {/* Product Image with animation */}
        <div className="relative h-80 pt-8 px-4 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/20 dark:to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Animated circle glow behind product */}
          <motion.div 
            className="absolute w-52 h-52 rounded-full bg-gradient-to-br from-amber-200/30 via-amber-100/20 to-amber-300/30 dark:from-amber-700/20 dark:via-amber-800/10 dark:to-amber-600/20 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Product image with hover animation */}
          <motion.div
            variants={{
              rest: { scale: 1, y: 0 },
              hover: { scale: 1.05, y: -5 }
            }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex items-center justify-center"
          >
            <div>
              <img 
                src={product.category === 'Coating' 
                  ? '/src/assets_dir/images/optimized/praetorian-products-updated.webp'
                  : '/src/assets_dir/images/optimized/praetorian-stucco.webp'} 
                alt={product.name} 
                className={`object-contain h-72 max-w-[90%] drop-shadow-xl transform ${product.category === 'Stucco' ? 'scale-110' : 'scale-90'}`}
              />
            </div>
          </motion.div>
        </div>
        
        <CardContent className="flex-grow p-6 relative z-10">
          {/* Product Name & Rating */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 leading-tight">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-100/90 to-amber-50/90 dark:from-amber-900/50 dark:to-amber-800/40 rounded-full shadow-[0_2px_6px_rgba(251,191,36,0.15)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.2)] border border-amber-200/60 dark:border-amber-700/30">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {product.rating}
              </span>
            </div>
          </div>
          
          {/* Price with icon */}
          <div className="mb-1 flex items-center">
            <CircleDollarSign className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-1.5" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 italic">
              + tax & shipping
            </span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
          
          {/* Key features */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 bg-gradient-to-r from-amber-50/90 to-amber-100/80 dark:from-amber-900/30 dark:to-amber-800/30 px-2 py-1 rounded-full border border-amber-200/60 dark:border-amber-700/30 shadow-[0_2px_6px_rgba(251,191,36,0.15)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
              <ShieldCheck className="h-3 w-3" />
              <span>Class A Rated</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 bg-gradient-to-r from-amber-50/90 to-amber-100/80 dark:from-amber-900/30 dark:to-amber-800/30 px-2 py-1 rounded-full border border-amber-200/60 dark:border-amber-700/30 shadow-[0_2px_6px_rgba(251,191,36,0.15)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
              <Droplets className="h-3 w-3" />
              <span>Waterproof</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex flex-col gap-3 relative z-10 bg-gradient-to-t from-amber-50/20 to-transparent dark:from-gray-800/20 dark:to-transparent">
          {/* Quantity Selector with metallic styling */}
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-sm font-medium text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Box className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
              Quantity
            </span>
            <div className="flex items-center rounded-full overflow-hidden bg-gradient-to-r from-amber-100 to-amber-50/90 dark:from-gray-800 dark:to-gray-700 border border-amber-200/60 dark:border-amber-700/30 shadow-[0_2px_6px_rgba(251,191,36,0.15)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
              <button 
                className="h-8 w-8 flex items-center justify-center text-amber-700 dark:text-amber-300 hover:bg-amber-200/50 dark:hover:bg-amber-800/50 transition-colors"
                onClick={decrementQuantity}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-sm font-medium text-amber-900 dark:text-amber-200">{quantity}</span>
              <button 
                className="h-8 w-8 flex items-center justify-center text-amber-700 dark:text-amber-300 hover:bg-amber-200/50 dark:hover:bg-amber-800/50 transition-colors"
                onClick={incrementQuantity}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          {/* Premium Add to Cart Button */}
          <PremiumButton 
            variant="default" 
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            icon={<ShoppingBag className="h-4 w-4" />}
          >
            Add to Cart
          </PremiumButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;