import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Product, useStore } from '@/contexts/StoreContext';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();

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

  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl relative bg-white dark:bg-gray-900 border-amber-200/50 dark:border-amber-800/20">
        {/* Product Size Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-700/30"
        >
          {product.size}
        </Badge>
        
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-80"></div>
        
        {/* Product Image */}
        <div className="relative h-64 pt-8 px-4 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/20 dark:to-gray-900 flex items-center justify-center">
          {/* Circle glow behind product */}
          <div className="absolute w-40 h-40 rounded-full bg-amber-100/70 dark:bg-amber-900/10 blur-xl"></div>
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="relative z-10 object-contain h-52 max-w-[80%] transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <CardContent className="flex-grow p-6">
          {/* Product Name & Rating */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 leading-tight">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {product.rating}
              </span>
            </div>
          </div>
          
          {/* Price */}
          <div className="mb-4">
            <span className="text-xl font-bold text-amber-800 dark:text-amber-400">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-col gap-2">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Quantity:</span>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 p-0 rounded-none text-gray-500"
                onClick={decrementQuantity}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 p-0 rounded-none text-gray-500"
                onClick={incrementQuantity}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            variant="default" 
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;