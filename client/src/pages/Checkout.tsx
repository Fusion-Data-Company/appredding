import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ShoppingBag, Home } from 'lucide-react';
import { useFormModal } from '@/contexts/FormModalContext';

export default function Checkout() {
  const { openSolarForm } = useFormModal();
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
          
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-6">
              <ShoppingBag className="h-16 w-16 text-amber-600 dark:text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Checkout Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
              We're setting up our secure checkout process for solar product orders. In the meantime, contact us directly for quotes and orders.
            </p>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
              <Button onClick={openSolarForm} className="bg-amber-600 hover:bg-amber-700 text-white">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
