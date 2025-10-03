import { Button } from '@/components/ui/button';
import { ShoppingCart, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {

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

              <div className="flex-1 flex flex-col items-center justify-center p-8" data-testid="empty-cart-message">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Cart Coming Soon</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                  Shopping cart functionality will be available soon for our solar products.
                </p>
                <Button
                  onClick={onClose}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  data-testid="button-continue-shopping"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
