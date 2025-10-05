import { useEffect } from 'react';
import { useLocation, useParams, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton, CardSkeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Package, MapPin, CreditCard, Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';

export default function OrderConfirmation() {
  const params = useParams();
  const [, navigate] = useLocation();
  const orderNumber = params.orderNumber;

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/orders/number', orderNumber],
    queryFn: async () => {
      const response = await fetch(`/api/orders/number/${orderNumber}`);
      if (!response.ok) {
        throw new Error('Order not found');
      }
      const result = await response.json();
      return result.order;
    },
    enabled: !!orderNumber
  });

  useEffect(() => {
    if (error) {
      console.error('Error loading order:', error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8 space-y-4" data-testid="loading-skeleton-order">
              <Skeleton className="h-20 w-20 rounded-full mx-auto" />
              <Skeleton className="h-10 w-2/3 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <Skeleton className="h-16 w-48 mx-auto rounded-lg" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <CardSkeleton />
              <CardSkeleton />
            </div>

            <CardSkeleton className="mb-8" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !data) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
              <h1 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">Order Not Found</h1>
              <p className="text-red-700 dark:text-red-300 mb-6">
                We couldn't find an order with number {orderNumber}. Please check your order number and try again.
              </p>
              <Button onClick={() => navigate('/products')} data-testid="button-return-shop">
                Return to Shop
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const order = data;
  const shippingAddress = order.shippingAddress;
  const billingAddress = order.billingAddress;

  const formatPaymentMethod = (method: string) => {
    const methods: Record<string, string> = {
      credit_card: 'Credit / Debit Card',
      paypal: 'PayPal',
      check: 'Check / Money Order',
      financing: 'Solar Financing'
    };
    return methods[method] || method;
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" data-testid="icon-success" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="heading-confirmed">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Thank you for your order
            </p>
            <div className="inline-block bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Order Number</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-order-number">
                {order.orderNumber}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Confirmation Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  We'll send a confirmation email to:
                </p>
                <p className="font-medium" data-testid="text-email">{order.email}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Estimated Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Your order should arrive within:
                </p>
                <p className="font-medium" data-testid="text-delivery">5-7 business days</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Items Ordered
                </h3>
                <div className="space-y-3">
                  {order.items && order.items.map((item: any, index: number) => (
                    <div key={item.id || index} className="flex justify-between items-center pb-3 border-b last:border-0">
                      <div>
                        <p className="font-medium" data-testid={`text-item-name-${index}`}>{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold" data-testid={`text-item-total-${index}`}>
                        ${parseFloat(item.subtotal).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Address
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p data-testid="text-shipping-name">{shippingAddress.name}</p>
                    <p data-testid="text-shipping-address">{shippingAddress.address}</p>
                    <p data-testid="text-shipping-city">
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                    </p>
                    <p data-testid="text-shipping-phone">
                      <Phone className="w-4 h-4 inline mr-1" />
                      {shippingAddress.phone}
                    </p>
                  </div>
                </div>

                {billingAddress && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Billing Address
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p data-testid="text-billing-name">{billingAddress.name}</p>
                      <p data-testid="text-billing-address">{billingAddress.address}</p>
                      <p data-testid="text-billing-city">
                        {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
                      </p>
                      <p data-testid="text-billing-phone">
                        <Phone className="w-4 h-4 inline mr-1" />
                        {billingAddress.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400" data-testid="text-payment-method">
                  {formatPaymentMethod(order.paymentMethod)}
                </p>
                {order.paymentMethod === 'check' && (
                  <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <p className="text-sm text-yellow-900 dark:text-yellow-100">
                      <strong>Payment Reminder:</strong> Please send your check or money order within 7 days to complete your order.
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span data-testid="text-subtotal">${parseFloat(order.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span data-testid="text-tax">${parseFloat(order.tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span data-testid="text-shipping">
                    {parseFloat(order.shipping) === 0 ? 'FREE' : `$${parseFloat(order.shipping).toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span data-testid="text-total">${parseFloat(order.total).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p>Your order will be processed within 1-2 business days</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p>You will receive a shipping confirmation with tracking information via email</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p>Estimated delivery: 5-7 business days from shipment</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p>Questions? Contact us at support@advancepowerredding.com or (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/products')}
              data-testid="button-continue-shopping"
            >
              Continue Shopping
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/contact')}
              data-testid="button-contact-us"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
