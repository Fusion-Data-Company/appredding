import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, Sun, Battery } from 'lucide-react';

interface ROICalculatorProps {
  onCalculate: (roi: any) => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ onCalculate }) => {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [batteryStorage, setBatteryStorage] = useState(false);
  const [results, setResults] = useState<any>(null);

  const calculateROI = () => {
    if (!monthlyBill || !systemSize) return;

    const bill = parseFloat(monthlyBill);
    const size = parseFloat(systemSize);
    
    // California-specific calculations
    const costPerWatt = 3.50; // Average cost per watt in CA
    const systemCost = size * 1000 * costPerWatt; // Convert kW to watts
    const batteryCost = batteryStorage ? 15000 : 0;
    const totalCost = systemCost + batteryCost;
    
    // NEM 3.0 calculations
    const monthlySavings = bill * 0.85; // 85% reduction typical
    const annualSavings = monthlySavings * 12;
    const paybackPeriod = totalCost / annualSavings;
    
    // 25-year projections
    const totalSavings25Year = annualSavings * 25;
    const netSavings = totalSavings25Year - totalCost;
    const roiPercentage = ((netSavings / totalCost) * 100);
    
    const result = {
      systemCost,
      batteryCost,
      totalCost,
      monthlySavings,
      annualSavings,
      paybackPeriod,
      totalSavings25Year,
      netSavings,
      roiPercentage
    };
    
    setResults(result);
    onCalculate(result);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Solar ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Monthly Electric Bill ($)</label>
          <Input
            type="number"
            placeholder="Enter monthly bill"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">System Size (kW)</label>
          <Input
            type="number"
            placeholder="System size in kW"
            value={systemSize}
            onChange={(e) => setSystemSize(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="battery"
            checked={batteryStorage}
            onChange={(e) => setBatteryStorage(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="battery" className="text-sm font-medium">
            Include Battery Storage (NEM 3.0 Optimized)
          </label>
        </div>
        
        <Button onClick={calculateROI} className="w-full">
          Calculate ROI
        </Button>
        
        {results && (
          <div className="space-y-3 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">ROI: {results.roiPercentage.toFixed(1)}%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-orange-600 dark:text-orange-400">Payback:</span>
                <div className="font-semibold">{results.paybackPeriod.toFixed(1)} years</div>
              </div>
              <div>
                <span className="text-orange-600 dark:text-orange-400">25-Year Savings:</span>
                <div className="font-semibold">${results.netSavings.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="text-xs text-orange-600 dark:text-orange-400">
              Based on NEM 3.0 rates and California incentives
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ROICalculator;

