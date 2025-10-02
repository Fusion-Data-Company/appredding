import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const HeroSection = () => {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [calculatedSavings, setCalculatedSavings] = useState<number | null>(null);

  const calculateROI = () => {
    const bill = parseFloat(monthlyBill);
    if (!isNaN(bill)) {
      const annualSavings = bill * 12 * 0.9; // 90% savings
      const federalTax = annualSavings * 0.3; // 30% federal tax credit
      const twentyFiveYearSavings = annualSavings * 25;
      setCalculatedSavings(twentyFiveYearSavings);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white overflow-hidden">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Solar panels"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Text */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <p className="text-sm font-medium">Northern California's Premier Solar Partner</p>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                Power Your Future<br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  with Solar Energy
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                Redding's most trusted solar installation experts. Transform your home with clean, renewable energy tailored to Northern California's unique climate.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-4xl font-semibold text-amber-400">500+</div>
                  <div className="text-sm text-gray-400 mt-1">Installations</div>
                </div>
                <div>
                  <div className="text-4xl font-semibold text-amber-400">25 Years</div>
                  <div className="text-sm text-gray-400 mt-1">Warranty</div>
                </div>
                <div>
                  <div className="text-4xl font-semibold text-amber-400">90%</div>
                  <div className="text-sm text-gray-400 mt-1">Avg. Savings</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 h-14 rounded-xl font-medium">
                  Get Free Assessment
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14 rounded-xl font-medium">
                  Call (530) 555-0100
                </Button>
              </div>
            </div>

            {/* Right Column - ROI Calculator */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8 rounded-3xl shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Calculate Your Savings</h3>
                  <p className="text-gray-300 text-sm">See how much you could save with solar in Redding</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="monthly-bill" className="text-white mb-2 block">
                      Monthly Electric Bill
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">$</span>
                      <Input
                        id="monthly-bill"
                        type="number"
                        placeholder="250"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 h-14 text-lg pl-8 rounded-xl"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculateROI} 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-14 text-lg rounded-xl font-medium"
                  >
                    Calculate Savings
                  </Button>
                </div>

                {calculatedSavings !== null && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl border border-amber-500/30 animate-in fade-in duration-500">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-300">Estimated 25-Year Savings</p>
                      <p className="text-4xl font-bold text-amber-400">
                        ${calculatedSavings.toLocaleString()}
                      </p>
                      <div className="pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                          <span>Federal Tax Credit (30%)</span>
                          <span className="text-amber-400 font-medium">Available</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>CA Solar Initiative</span>
                          <span className="text-amber-400 font-medium">Eligible</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>SGIP Battery Rebate</span>
                          <span className="text-amber-400 font-medium">Up to $3,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-gray-400 text-center">
                    ✓ No upfront costs available • ✓ 0% financing options • ✓ Free consultation
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-400">Scroll to explore</p>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;