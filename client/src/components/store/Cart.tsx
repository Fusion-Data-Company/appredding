import React, { useState } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingBag, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { PremiumCartButton, PremiumArrowButton } from '@/utils/premium-buttons';

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateCartItemQuantity, clearCart, cartTotal, cartCount } = useStore();

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your order. We'll process it right away.",
    });
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Cart Trigger Button */}
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-full shadow-soft flex items-center bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700"
        size="icon"
      >
        <ShoppingBag className="h-5 w-5 text-amber-900 dark:text-amber-400" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-600 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold z-[100]">
            {cartCount}
          </span>
        )}
      </Button>

      {/* Overlay when cart is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b bg-gradient-to-b from-amber-100/80 to-amber-50/30 dark:from-amber-900/30 dark:to-gray-900/90">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Cart {cartCount > 0 && `(${cartCount})`}
                </h2>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center p-8">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Start adding some products to see them here!</p>
                  <Button variant="default" onClick={() => setIsOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <Card key={item.product.id} className="p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500/50 to-amber-600/50" />
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="object-contain w-16 h-16" 
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-amber-900 dark:text-amber-300">{item.product.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              ${item.product.price.toFixed(2)} 
                              <span className="text-xs italic ml-1">+ tax & shipping</span>
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 rounded-none text-gray-500"
                                  onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 rounded-none text-gray-500"
                                  onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-gray-500"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Subtotal</span>
                      <span className="text-amber-900 dark:text-amber-400">${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
                      * Prices shown do not include applicable taxes and shipping. 
                      Final costs will be calculated at checkout.
                    </p>
                    
                    <PremiumCartButton 
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </PremiumCartButton>
                    
                    <PremiumArrowButton 
                      className="w-full mt-2"
                      size="md"
                      onClick={() => clearCart()}
                    >
                      Clear Cart
                    </PremiumArrowButton>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;