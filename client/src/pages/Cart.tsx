import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useStore } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, RotateCcw, ChevronRight, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Cart() {
  const { items, subtotal, tax, shipping, total, itemCount, removeFromCart, updateCartItemQuantity, clearCart } = useStore();
  const [, setLocation] = useLocation();

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Removed from cart",
      description: `${productName} has been removed from your cart.`,
    });
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
    toast({
      title: "Cart updated",
      description: "Quantity has been updated.",
      variant: "default"
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Proceed to Checkout",
      description: "Checkout functionality will be implemented soon.",
    });
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-6">
              <ShoppingCart className="h-16 w-16 text-amber-600 dark:text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="empty-cart-heading">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
              Looks like you haven't added any products to your cart yet. Start shopping to find premium protective coatings!
            </p>
            <Button
              onClick={() => setLocation('/products')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg"
              data-testid="button-start-shopping"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-500" data-testid="link-home">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 dark:text-white font-medium">Cart</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="page-heading">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-semibold text-sm text-gray-700 dark:text-gray-300">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {items.map((item) => (
                <Card key={item.productId} className="p-4" data-testid={`cart-item-${item.productId}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-6 flex gap-4 items-center">
                      <div className="w-24 h-24 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-contain w-20 h-20"
                          data-testid={`img-product-${item.productId}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1" data-testid={`text-product-name-${item.productId}`}>
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400" data-testid={`text-product-sku-${item.productId}`}>
                          SKU: {item.sku}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.category} • {item.size}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center">
                      <div>
                        <p className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-1">Price</p>
                        <p className="font-semibold text-amber-600 dark:text-amber-500" data-testid={`text-price-${item.productId}`}>
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-center">
                      <div>
                        <p className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-1">Quantity</p>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 rounded-none"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            data-testid={`button-decrease-quantity-${item.productId}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium" data-testid={`text-quantity-${item.productId}`}>
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 rounded-none"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            data-testid={`button-increase-quantity-${item.productId}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex md:justify-end items-center gap-4">
                      <div>
                        <p className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-1">Subtotal</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white" data-testid={`text-item-subtotal-${item.productId}`}>
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRemoveItem(item.productId, item.name)}
                        data-testid={`button-remove-${item.productId}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/products" className="flex-1">
                <Button variant="outline" className="w-full" data-testid="button-continue-shopping">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300" data-testid="button-clear-cart">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Shopping Cart?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all items from your cart. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart} className="bg-red-600 hover:bg-red-700">
                      Clear Cart
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                Cart Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold" data-testid="text-summary-subtotal">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax (7.75%)</span>
                  <span className="font-semibold" data-testid="text-summary-tax">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className="font-semibold" data-testid="text-summary-shipping">
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-500 font-bold">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                {subtotal < 1000 && subtotal > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm">
                    <p className="text-amber-800 dark:text-amber-300">
                      Add <span className="font-bold">{formatCurrency(1000 - subtotal)}</span> more for <span className="font-bold text-green-600 dark:text-green-500">FREE SHIPPING</span>!
                    </p>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-amber-600 dark:text-amber-500" data-testid="text-summary-total">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-6 text-lg mb-4"
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <RotateCcw className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
