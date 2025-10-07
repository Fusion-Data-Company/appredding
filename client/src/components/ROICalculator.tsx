import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, Sun, Battery } from 'lucide-react';

interface ROICalculatorProps {
  onCalculate?: (roi: any) => void;
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

    // Advance Power Redding specific pricing
    const costPerWatt = 3.25; // Competitive pricing in Shasta County
    const systemCost = size * 1000 * costPerWatt; // Convert kW to watts

    // Battery costs based on API Lithium systems from sales manual
    // 14.336 kWh API battery system typical for residential
    const batteryCost = batteryStorage ? 18000 : 0;

    // Federal tax credit (30% through 2032, then 26% in 2033)
    const federalTaxCredit = (systemCost + batteryCost) * 0.30;
    const totalCost = systemCost + batteryCost - federalTaxCredit;

    // NEM 3.0 calculations with battery optimization
    // With battery: 85-90% bill reduction
    // Without battery: 70-75% bill reduction
    const billReduction = batteryStorage ? 0.875 : 0.725;
    const monthlySavings = bill * billReduction;
    const annualSavings = monthlySavings * 12;

    // Account for utility rate increases (4% annual average)
    const utilityInflation = 0.04;
    let totalSavings25Year = 0;
    let currentAnnualSavings = annualSavings;

    for (let year = 1; year <= 25; year++) {
      totalSavings25Year += currentAnnualSavings;
      currentAnnualSavings = currentAnnualSavings * (1 + utilityInflation);
    }

    const paybackPeriod = totalCost / annualSavings;
    const netSavings = totalSavings25Year - totalCost;
    const roiPercentage = ((netSavings / totalCost) * 100);
    
    const result = {
      systemCost,
      batteryCost,
      federalTaxCredit,
      totalCost,
      monthlySavings,
      annualSavings,
      paybackPeriod,
      totalSavings25Year,
      netSavings,
      roiPercentage
    };
    
    setResults(result);
    if (onCalculate) {
      onCalculate(result);
    }
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
                <span className="text-orange-600 dark:text-orange-400">System Cost:</span>
                <div className="font-semibold">${(results.systemCost + results.batteryCost).toLocaleString()}</div>
              </div>
              <div>
                <span className="text-orange-600 dark:text-orange-400">Federal Tax Credit:</span>
                <div className="font-semibold text-green-600">-${results.federalTaxCredit.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-orange-600 dark:text-orange-400">Net Cost:</span>
                <div className="font-semibold">${results.totalCost.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-orange-600 dark:text-orange-400">Payback Period:</span>
                <div className="font-semibold">{results.paybackPeriod.toFixed(1)} years</div>
              </div>
              <div>
                <span className="text-orange-600 dark:text-orange-400">Monthly Savings:</span>
                <div className="font-semibold">${results.monthlySavings.toFixed(0)}</div>
              </div>
              <div>
                <span className="text-orange-600 dark:text-orange-400">25-Year Savings:</span>
                <div className="font-semibold text-green-600">${results.netSavings.toLocaleString()}</div>
              </div>
            </div>

            <div className="text-xs text-orange-600 dark:text-orange-400">
              Based on NEM 3.0 rates, 30% federal tax credit, and 4% annual utility rate increases
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ROICalculator;

