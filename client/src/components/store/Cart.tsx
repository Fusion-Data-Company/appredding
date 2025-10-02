import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8 bg-slate-800 rounded-lg border border-slate-700">
      <div className="text-center">
        <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Shopping Cart</h3>
        <p className="text-slate-400">Cart functionality coming soon</p>
      </div>
    </div>
  );
};

export default Cart;
