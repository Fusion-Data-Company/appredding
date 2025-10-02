import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Package, DollarSign } from 'lucide-react';

interface ShippingCalculatorProps {
  onCalculate: (cost: number) => void;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onCalculate }) => {
  const [zipCode, setZipCode] = useState('');
  const [packageWeight, setPackageWeight] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);

  const calculateShipping = () => {
    if (!zipCode || !packageWeight || !shippingMethod) return;

    // Base shipping rates from Northern California (Redding area)
    const baseRates = {
      'ground': 15,
      'express': 35,
      'overnight': 75
    };

    const weight = parseFloat(packageWeight);
    const baseRate = baseRates[shippingMethod as keyof typeof baseRates] || 15;
    
    // Distance-based calculation (simplified)
    const distanceMultiplier = zipCode.startsWith('9') ? 1.2 : 1.5; // CA vs other states
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
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Destination ZIP Code</label>
          <Input
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Package Weight (lbs)</label>
          <Input
            type="number"
            placeholder="Weight in pounds"
            value={packageWeight}
            onChange={(e) => setPackageWeight(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Shipping Method</label>
          <Select value={shippingMethod} onValueChange={setShippingMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ground">Ground (5-7 days)</SelectItem>
              <SelectItem value="express">Express (2-3 days)</SelectItem>
              <SelectItem value="overnight">Overnight (1 day)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={calculateShipping} className="w-full">
          Calculate Shipping
        </Button>
        
        {calculatedCost && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">Estimated Cost: ${calculatedCost}</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              Shipping from Redding, CA
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingCalculator;
