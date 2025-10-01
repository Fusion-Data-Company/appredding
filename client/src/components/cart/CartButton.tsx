import { useState } from 'react';
import { useStore } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import CartDrawer from './CartDrawer';

export default function CartButton() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { itemCount } = useStore();

  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        data-testid="cart-button"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-6 w-6 text-white" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={itemCount}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
            data-testid="cart-item-count"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </button>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
