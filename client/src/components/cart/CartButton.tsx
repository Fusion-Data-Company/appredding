import { ShoppingCart } from 'lucide-react';

export default function CartButton() {
  return (
    <button
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-50 cursor-not-allowed"
      data-testid="cart-button"
      aria-label="Shopping cart (Coming soon)"
      disabled
    >
      <ShoppingCart className="h-6 w-6 text-white" />
    </button>
  );
}
