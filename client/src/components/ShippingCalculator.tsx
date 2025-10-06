import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MapPin, Package, DollarSign } from 'lucide-react';

interface ShippingCalculatorProps {
  onCalculate: (cost: number) => void;
}

const shippingSchema = z.object({
  zipCode: z.string()
    .min(1, 'Please enter the destination ZIP code')
    .regex(/^\d{5}(-\d{4})?$/, 'ZIP code must be in format: 12345 or 12345-6789'),
  packageWeight: z.string()
    .min(1, 'Please enter the package weight')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Weight must be a positive number'),
  shippingMethod: z.string()
    .min(1, 'Please select a shipping method'),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onCalculate }) => {
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      zipCode: '',
      packageWeight: '',
      shippingMethod: '',
    },
  });

  const calculateShipping = (values: ShippingFormValues) => {
    // Base shipping rates from Northern California (Redding area)
    const baseRates = {
      'ground': 15,
      'express': 35,
      'overnight': 75
    };

    const weight = parseFloat(values.packageWeight);
    const baseRate = baseRates[values.shippingMethod as keyof typeof baseRates] || 15;
    
    // Distance-based calculation (simplified)
    const distanceMultiplier = values.zipCode.startsWith('9') ? 1.2 : 1.5; // CA vs other states
    const weightMultiplier = Math.max(1, weight / 10); // $1 per 10lbs
    
    const totalCost = Math.round((baseRate + (weightMultiplier * 5)) * distanceMultiplier);
    
    setCalculatedCost(totalCost);
    onCalculate(totalCost);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Shipping Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(calculateShipping)} className="space-y-4">
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination ZIP Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter ZIP code (e.g., 96001)"
                      data-testid="input-zip-code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="packageWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Weight (lbs)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Weight in pounds"
                      data-testid="input-package-weight"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shippingMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Method</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-shipping-method">
                        <SelectValue placeholder="Select shipping method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ground">Ground (5-7 days)</SelectItem>
                      <SelectItem value="express">Express (2-3 days)</SelectItem>
                      <SelectItem value="overnight">Overnight (1 day)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" data-testid="button-calculate-shipping">
              Calculate Shipping
            </Button>
            
            {calculatedCost && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold" data-testid="text-shipping-cost">Estimated Cost: ${calculatedCost}</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Shipping from Redding, CA
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ShippingCalculator;
