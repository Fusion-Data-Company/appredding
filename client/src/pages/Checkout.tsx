import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useStore } from '@/contexts/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Check, ChevronLeft, ChevronRight, Loader2, CreditCard, Building2, CheckCircle2, MapPin, Mail, Phone, User } from 'lucide-react';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const contactSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional()
});

const shippingSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  address: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  phone: z.string().min(10, 'Phone number is required')
});

const billingSchema = z.object({
  sameAsShipping: z.boolean(),
  name: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional()
}).refine((data) => {
  if (!data.sameAsShipping) {
    return data.name && data.address && data.city && data.state && data.zip && data.phone;
  }
  return true;
}, {
  message: 'All billing address fields are required when different from shipping',
  path: ['name']
});

const paymentSchema = z.object({
  paymentMethod: z.enum(['credit_card', 'paypal', 'check', 'financing'])
});

const reviewSchema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
});

export default function Checkout() {
  const { items, clearCart } = useStore();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [contactData, setContactData] = useState({ email: '', phone: '' });
  const [shippingData, setShippingData] = useState({
    name: '', address: '', address2: '', city: '', state: 'CA', zip: '', phone: ''
  });
  const [billingData, setBillingData] = useState({
    sameAsShipping: true, name: '', address: '', address2: '', city: '', state: 'CA', zip: '', phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'check' | 'financing'>('credit_card');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const contactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: contactData
  });

  const shippingForm = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingData
  });

  const billingForm = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: billingData
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: { paymentMethod }
  });

  const reviewForm = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { termsAccepted }
  });

  useEffect(() => {
    if (items.length === 0 && currentStep === 1) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive'
      });
      navigate('/products');
    }
  }, [items, currentStep, navigate, toast]);

  const createOrderMutation = useMutation({
    mutationFn: (orderData: any) => apiRequest('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData)
    }),
    onSuccess: (data) => {
      clearCart();
      navigate(`/order/confirmation/${data.orderNumber}`);
    },
    onError: (error: any) => {
      toast({
        title: 'Order failed',
        description: error.message || 'There was an error creating your order. Please try again.',
        variant: 'destructive'
      });
      setSubmitting(false);
    }
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Number((subtotal * 0.0775).toFixed(2));
  const shipping = subtotal > 100 ? 0 : 15.00;
  const orderTotal = Number((subtotal + tax + shipping).toFixed(2));

  const steps = [
    { number: 1, title: 'Contact', icon: Mail },
    { number: 2, title: 'Shipping', icon: MapPin },
    { number: 3, title: 'Billing', icon: Building2 },
    { number: 4, title: 'Payment', icon: CreditCard },
    { number: 5, title: 'Review', icon: CheckCircle2 }
  ];

  const handleContactNext = contactForm.handleSubmit((data) => {
    setContactData(data);
    setCurrentStep(2);
  });

  const handleShippingNext = shippingForm.handleSubmit((data) => {
    setShippingData(data);
    setCurrentStep(3);
  });

  const handleBillingNext = billingForm.handleSubmit((data) => {
    setBillingData(data);
    setCurrentStep(4);
  });

  const handlePaymentNext = paymentForm.handleSubmit((data) => {
    setPaymentMethod(data.paymentMethod);
    setCurrentStep(5);
  });

  const handlePlaceOrder = reviewForm.handleSubmit(async (data) => {
    setSubmitting(true);

    const orderItems = items.map(item => ({
      productId: item.productId,
      sku: item.sku,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: Number((item.price * item.quantity).toFixed(2))
    }));

    const shippingAddress = {
      name: shippingData.name,
      address: shippingData.address + (shippingData.address2 ? `, ${shippingData.address2}` : ''),
      city: shippingData.city,
      state: shippingData.state,
      zip: shippingData.zip,
      phone: shippingData.phone
    };

    const billingAddress = billingData.sameAsShipping ? null : {
      name: billingData.name || '',
      address: billingData.address + (billingData.address2 ? `, ${billingData.address2}` : ''),
      city: billingData.city || '',
      state: billingData.state || '',
      zip: billingData.zip || '',
      phone: billingData.phone || ''
    };

    const orderData = {
      email: contactData.email,
      items: orderItems,
      shippingAddress,
      billingAddress,
      paymentMethod
    };

    await new Promise(resolve => setTimeout(resolve, 2000));

    createOrderMutation.mutate(orderData);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px]">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                      data-testid={`step-indicator-${step.number}`}
                    >
                      {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && 'Contact Information'}
                  {currentStep === 2 && 'Shipping Address'}
                  {currentStep === 3 && 'Billing Address'}
                  {currentStep === 4 && 'Payment Method'}
                  {currentStep === 5 && 'Review Order'}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && 'We\'ll use this to send you order confirmation'}
                  {currentStep === 2 && 'Where should we ship your order?'}
                  {currentStep === 3 && 'Billing information for this order'}
                  {currentStep === 4 && 'How would you like to pay?'}
                  {currentStep === 5 && 'Please review your order before submitting'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <form onSubmit={handleContactNext} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        data-testid="input-email"
                        {...contactForm.register('email')}
                      />
                      {contactForm.formState.errors.email && (
                        <p className="text-sm text-red-500 mt-1">{contactForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        data-testid="input-phone"
                        {...contactForm.register('phone')}
                      />
                      {contactForm.formState.errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{contactForm.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" data-testid="button-next-contact">
                        Next <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}

                {currentStep === 2 && (
                  <form onSubmit={handleShippingNext} className="space-y-4">
                    <div>
                      <Label htmlFor="shipping-name">Full Name *</Label>
                      <Input
                        id="shipping-name"
                        placeholder="John Doe"
                        data-testid="input-shipping-name"
                        {...shippingForm.register('name')}
                      />
                      {shippingForm.formState.errors.name && (
                        <p className="text-sm text-red-500 mt-1">{shippingForm.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="shipping-address">Address Line 1 *</Label>
                      <Input
                        id="shipping-address"
                        placeholder="123 Main St"
                        data-testid="input-shipping-address"
                        {...shippingForm.register('address')}
                      />
                      {shippingForm.formState.errors.address && (
                        <p className="text-sm text-red-500 mt-1">{shippingForm.formState.errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="shipping-address2">Address Line 2</Label>
                      <Input
                        id="shipping-address2"
                        placeholder="Apt, Suite, etc."
                        data-testid="input-shipping-address2"
                        {...shippingForm.register('address2')}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping-city">City *</Label>
                        <Input
                          id="shipping-city"
                          placeholder="Redding"
                          data-testid="input-shipping-city"
                          {...shippingForm.register('city')}
                        />
                        {shippingForm.formState.errors.city && (
                          <p className="text-sm text-red-500 mt-1">{shippingForm.formState.errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="shipping-state">State *</Label>
                        <Select
                          defaultValue="CA"
                          onValueChange={(value) => shippingForm.setValue('state', value)}
                        >
                          <SelectTrigger id="shipping-state" data-testid="select-shipping-state">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {shippingForm.formState.errors.state && (
                          <p className="text-sm text-red-500 mt-1">{shippingForm.formState.errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping-zip">ZIP Code *</Label>
                        <Input
                          id="shipping-zip"
                          placeholder="96001"
                          maxLength={5}
                          data-testid="input-shipping-zip"
                          {...shippingForm.register('zip')}
                        />
                        {shippingForm.formState.errors.zip && (
                          <p className="text-sm text-red-500 mt-1">{shippingForm.formState.errors.zip.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="shipping-phone">Phone *</Label>
                        <Input
                          id="shipping-phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          data-testid="input-shipping-phone"
                          {...shippingForm.register('phone')}
                        />
                        {shippingForm.formState.errors.phone && (
                          <p className="text-sm text-red-500 mt-1">{shippingForm.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} data-testid="button-back-shipping">
                        <ChevronLeft className="mr-2 w-4 h-4" /> Back
                      </Button>
                      <Button type="submit" data-testid="button-next-shipping">
                        Next <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}

                {currentStep === 3 && (
                  <form onSubmit={handleBillingNext} className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="same-as-shipping"
                        checked={billingData.sameAsShipping}
                        onCheckedChange={(checked) => {
                          billingForm.setValue('sameAsShipping', checked as boolean);
                          setBillingData({ ...billingData, sameAsShipping: checked as boolean });
                        }}
                        data-testid="checkbox-same-as-shipping"
                      />
                      <Label htmlFor="same-as-shipping" className="cursor-pointer">
                        Billing address same as shipping address
                      </Label>
                    </div>

                    {!billingData.sameAsShipping && (
                      <>
                        <div>
                          <Label htmlFor="billing-name">Full Name *</Label>
                          <Input
                            id="billing-name"
                            placeholder="John Doe"
                            data-testid="input-billing-name"
                            {...billingForm.register('name')}
                          />
                        </div>

                        <div>
                          <Label htmlFor="billing-address">Address Line 1 *</Label>
                          <Input
                            id="billing-address"
                            placeholder="123 Main St"
                            data-testid="input-billing-address"
                            {...billingForm.register('address')}
                          />
                        </div>

                        <div>
                          <Label htmlFor="billing-address2">Address Line 2</Label>
                          <Input
                            id="billing-address2"
                            placeholder="Apt, Suite, etc."
                            data-testid="input-billing-address2"
                            {...billingForm.register('address2')}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billing-city">City *</Label>
                            <Input
                              id="billing-city"
                              placeholder="Redding"
                              data-testid="input-billing-city"
                              {...billingForm.register('city')}
                            />
                          </div>

                          <div>
                            <Label htmlFor="billing-state">State *</Label>
                            <Select
                              defaultValue="CA"
                              onValueChange={(value) => billingForm.setValue('state', value)}
                            >
                              <SelectTrigger id="billing-state" data-testid="select-billing-state">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {US_STATES.map(state => (
                                  <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billing-zip">ZIP Code *</Label>
                            <Input
                              id="billing-zip"
                              placeholder="96001"
                              maxLength={5}
                              data-testid="input-billing-zip"
                              {...billingForm.register('zip')}
                            />
                          </div>

                          <div>
                            <Label htmlFor="billing-phone">Phone *</Label>
                            <Input
                              id="billing-phone"
                              type="tel"
                              placeholder="(555) 123-4567"
                              data-testid="input-billing-phone"
                              {...billingForm.register('phone')}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} data-testid="button-back-billing">
                        <ChevronLeft className="mr-2 w-4 h-4" /> Back
                      </Button>
                      <Button type="submit" data-testid="button-next-billing">
                        Next <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}

                {currentStep === 4 && (
                  <form onSubmit={handlePaymentNext} className="space-y-4">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => {
                        setPaymentMethod(value as any);
                        paymentForm.setValue('paymentMethod', value as any);
                      }}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="credit_card" id="credit_card" data-testid="radio-credit-card" />
                        <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            <div>
                              <div className="font-medium">Credit / Debit Card</div>
                              <div className="text-sm text-gray-500">Pay securely with Stripe (Integration Ready)</div>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" data-testid="radio-paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-5 h-5 mr-2 text-blue-600 font-bold">PP</div>
                            <div>
                              <div className="font-medium">PayPal</div>
                              <div className="text-sm text-gray-500">Pay with your PayPal account (Integration Ready)</div>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="check" id="check" data-testid="radio-check" />
                        <Label htmlFor="check" className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            <Building2 className="w-5 h-5 mr-2" />
                            <div>
                              <div className="font-medium">Check / Money Order</div>
                              <div className="text-sm text-gray-500">Mail payment within 7 days of order</div>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="financing" id="financing" data-testid="radio-financing" />
                        <Label htmlFor="financing" className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            <div>
                              <div className="font-medium">Solar Financing</div>
                              <div className="text-sm text-gray-500">Apply for financing options</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'check' && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          <strong>Payment Instructions:</strong><br />
                          Please make check or money order payable to "Advance Power Redding" and mail to:<br />
                          Advance Power Redding<br />
                          123 Solar Way<br />
                          Redding, CA 96001
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(3)} data-testid="button-back-payment">
                        <ChevronLeft className="mr-2 w-4 h-4" /> Back
                      </Button>
                      <Button type="submit" data-testid="button-next-payment">
                        Next <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}

                {currentStep === 5 && (
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Contact Information</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{contactData.email}</p>
                      {contactData.phone && <p className="text-sm text-gray-600 dark:text-gray-400">{contactData.phone}</p>}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{shippingData.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{shippingData.address}</p>
                      {shippingData.address2 && <p className="text-sm text-gray-600 dark:text-gray-400">{shippingData.address2}</p>}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {shippingData.city}, {shippingData.state} {shippingData.zip}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{shippingData.phone}</p>
                    </div>

                    {!billingData.sameAsShipping && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-2">Billing Address</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{billingData.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{billingData.address}</p>
                          {billingData.address2 && <p className="text-sm text-gray-600 dark:text-gray-400">{billingData.address2}</p>}
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {billingData.city}, {billingData.state} {billingData.zip}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{billingData.phone}</p>
                        </div>
                      </>
                    )}

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {paymentMethod === 'credit_card' && 'Credit / Debit Card'}
                        {paymentMethod === 'paypal' && 'PayPal'}
                        {paymentMethod === 'check' && 'Check / Money Order'}
                        {paymentMethod === 'financing' && 'Solar Financing'}
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => {
                          setTermsAccepted(checked as boolean);
                          reviewForm.setValue('termsAccepted', checked as boolean);
                        }}
                        data-testid="checkbox-terms"
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                    {reviewForm.formState.errors.termsAccepted && (
                      <p className="text-sm text-red-500">{reviewForm.formState.errors.termsAccepted.message}</p>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(4)} disabled={submitting} data-testid="button-back-review">
                        <ChevronLeft className="mr-2 w-4 h-4" /> Back
                      </Button>
                      <Button type="submit" size="lg" disabled={submitting} data-testid="button-place-order">
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Place Order</>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (7.75%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal <= 100 && (
                    <p className="text-xs text-gray-500">Free shipping on orders over $100</p>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
