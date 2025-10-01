import { useState } from 'react';
import { useStore } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, tax, shipping, total, itemCount, removeFromCart, updateCartItemQuantity, clearCart } = useStore();
  const [, setLocation] = useLocation();

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Removed from cart",
      description: `${productName} has been removed from your cart.`,
      variant: "default"
    });
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    toast({
      title: "Proceed to Checkout",
      description: "Checkout functionality will be implemented soon.",
      variant: "default"
    });
    onClose();
  };

  const handleViewCart = () => {
    setLocation('/cart');
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={onClose}
              data-testid="cart-drawer-overlay"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-[101] overflow-hidden flex flex-col"
              data-testid="cart-drawer"
            >
              <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-amber-600 dark:text-amber-500" data-testid="cart-icon" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white" data-testid="cart-title">
                      Shopping Cart
                    </h2>
                    {itemCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-amber-600 text-white rounded-full" data-testid="cart-item-count-badge">
                        {itemCount}
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    data-testid="button-close-drawer"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8" data-testid="empty-cart-message">
                  <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                    Start adding some premium products to see them here!
                  </p>
                  <Button
                    onClick={() => {
                      setLocation('/products');
                      onClose();
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    data-testid="button-continue-shopping"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.map((item, index) => (
                      <Card
                        key={item.productId}
                        className="p-4 relative"
                        data-testid={`cart-item-${item.productId}`}
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-contain w-16 h-16"
                              data-testid={`img-product-${item.productId}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate" data-testid={`text-product-name-${item.productId}`}>
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400" data-testid={`text-product-sku-${item.productId}`}>
                              SKU: {item.sku}
                            </p>
                            <p className="text-sm font-medium text-amber-600 dark:text-amber-500 mt-1" data-testid={`text-product-price-${item.productId}`}>
                              {formatCurrency(item.price)} each
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 rounded-none"
                                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                  data-testid={`button-decrease-quantity-${item.productId}`}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center text-sm font-medium" data-testid={`text-quantity-${item.productId}`}>
                                  {item.quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 rounded-none"
                                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                  data-testid={`button-increase-quantity-${item.productId}`}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Subtotal</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white" data-testid={`text-item-subtotal-${item.productId}`}>
                                  {formatCurrency(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs"
                              onClick={() => handleRemoveItem(item.productId, item.name)}
                              data-testid={`button-remove-${item.productId}`}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="text-subtotal">
                          {formatCurrency(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Tax (7.75%):</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="text-tax">
                          {formatCurrency(tax)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                        <span className="font-medium text-gray-900 dark:text-white" data-testid="text-shipping">
                          {shipping === 0 ? (
                            <span className="text-green-600 dark:text-green-500 font-bold">FREE</span>
                          ) : (
                            formatCurrency(shipping)
                          )}
                        </span>
                      </div>
                      {subtotal < 1000 && subtotal > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          Add {formatCurrency(1000 - subtotal)} more for free shipping!
                        </p>
                      )}
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                        <span className="text-gray-900 dark:text-white">Total:</span>
                        <span className="text-amber-600 dark:text-amber-500" data-testid="text-total">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                        data-testid="button-checkout"
                      >
                        Proceed to Checkout
                      </Button>
                      <Button
                        onClick={handleViewCart}
                        variant="outline"
                        className="w-full"
                        data-testid="button-view-cart"
                      >
                        View Full Cart
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
