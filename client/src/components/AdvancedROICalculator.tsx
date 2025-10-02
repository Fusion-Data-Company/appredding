import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Sun, Zap, TrendingUp, DollarSign, Home, ArrowRight, Check, Calculator } from 'lucide-react';

const AdvancedROICalculator: React.FC = () => {
  const [systemSize, setSystemSize] = useState(8);
  const [monthlyBill, setMonthlyBill] = useState(250);
  const [roiData, setRoiData] = useState({
    annualSavings: 0,
    paybackPeriod: 0,
    lifetimeSavings: 0,
    federalTaxCredit: 0,
  });

  useEffect(() => {
    const annualProduction = systemSize * 1400;
    const annualSavings = (monthlyBill * 12 * 0.85);
    const systemCost = systemSize * 2800;
    const federalTaxCredit = systemCost * 0.30;
    const netCost = systemCost - federalTaxCredit;
    const paybackPeriod = netCost / annualSavings;
    const lifetimeSavings = (annualSavings * 25) - netCost;

    setRoiData({
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      lifetimeSavings: Math.round(lifetimeSavings),
      federalTaxCredit: Math.round(federalTaxCredit),
    });
  }, [systemSize, monthlyBill]);

  const benefits = [
    { icon: Sun, title: "30% Federal Tax Credit", description: "Maximize your savings with ITC" },
    { icon: Zap, title: "SGIP Battery Rebates", description: "Up to $1,000/kWh in California" },
    { icon: TrendingUp, title: "Net Metering", description: "Sell excess power back to PG&E" },
    { icon: Home, title: "Property Value Boost", description: "Increase home value by 4.1%" },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-blue-50 dark:from-orange-950/20 dark:via-background dark:to-blue-950/20" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <Badge className="px-4 py-2 text-sm font-medium bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800">
            <Sun className="w-4 h-4 mr-2 inline" />
            Northern California's Premier Solar Provider
          </Badge>
        </div>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                Power Your Future
              </span>
              <br />
              <span className="text-foreground">With Solar Energy</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              Join thousands of Northern California homeowners saving with premium solar solutions. 
              Enterprise-grade technology, local expertise, and unmatched ROI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Calculator className="mr-2 w-5 h-5" />
                Calculate Savings
              </Button>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - ROI Calculator */}
          <div className="relative">
            <Card className="border-2 shadow-2xl bg-card/95 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Advanced ROI Calculator</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Live Estimate
                  </Badge>
                </div>

                <div className="space-y-6">
                  {/* System Size Input */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">System Size (kW)</label>
                      <span className="text-2xl font-bold text-orange-600">{systemSize} kW</span>
                    </div>
                    <Slider
                      value={[systemSize]}
                      onValueChange={(value) => setSystemSize(value[0])}
                      min={4}
                      max={15}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  {/* Monthly Bill Input */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Monthly Electric Bill</label>
                      <span className="text-2xl font-bold text-orange-600">${monthlyBill}</span>
                    </div>
                    <Slider
                      value={[monthlyBill]}
                      onValueChange={(value) => setMonthlyBill(value[0])}
                      min={100}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Results */}
                  <div className="pt-6 border-t space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Annual Savings</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${roiData.annualSavings.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Payback Period</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {roiData.paybackPeriod} years
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">25-Year Savings</div>
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        ${roiData.lifetimeSavings.toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Federal Tax Credit (30%)</div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${roiData.federalTaxCredit.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600" size="lg">
                    Get Personalized Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card border-2 shadow-xl rounded-xl p-4 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2,500+</div>
                  <div className="text-sm text-muted-foreground">Installations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-orange-600">25+</div>
            <div className="text-sm text-muted-foreground mt-2">Years Warranty</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">A+</div>
            <div className="text-sm text-muted-foreground mt-2">BBB Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">$0</div>
            <div className="text-sm text-muted-foreground mt-2">Down Payment</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-muted-foreground mt-2">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedROICalculator;

