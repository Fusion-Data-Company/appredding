import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ShoppingCart, Home, ArrowLeft } from 'lucide-react';

export default function Cart() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-6">
            <ShoppingCart className="h-16 w-16 text-amber-600 dark:text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="empty-cart-heading">
            Shopping Cart Coming Soon
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
            We're building an online shopping experience for our solar products. Check back soon!
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" data-testid="button-home">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Contact Us for Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
