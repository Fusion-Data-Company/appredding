import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ShippingCalculator from '@/components/ShippingCalculator';
import ROICalculator from '@/components/ROICalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Calculator, MapPin, DollarSign } from 'lucide-react';

const Commerce = () => {
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [roiData, setRoiData] = useState<any>(null);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Solar Commerce Center
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Calculate shipping costs and ROI for your solar investment. 
            Get instant estimates for Northern California coverage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Shipping Calculator */}
          <div>
            <ShippingCalculator onCalculate={setShippingCost} />
            
            {shippingCost && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Shipping Cost:</span>
                      <span className="font-semibold">${shippingCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Origin:</span>
                      <span>Redding, CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage:</span>
                      <span>All US States</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ROI Calculator */}
          <div>
            <ROICalculator onCalculate={setRoiData} />
            
            {roiData && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Investment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>System Cost:</span>
                      <span className="font-semibold">${roiData.systemCost.toLocaleString()}</span>
                    </div>
                    {roiData.batteryCost > 0 && (
                      <div className="flex justify-between">
                        <span>Battery Storage:</span>
                        <span className="font-semibold">${roiData.batteryCost.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Total Investment:</span>
                      <span className="font-semibold">${roiData.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Savings:</span>
                      <span className="font-semibold text-orange-400">${roiData.annualSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Combined Results */}
        {(shippingCost || roiData) && (
          <Card className="mt-12 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Complete Investment Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Package className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold text-white">
                    {shippingCost ? `$${shippingCost}` : 'N/A'}
                  </div>
                  <div className="text-sm text-slate-400">Shipping Cost</div>
                </div>
                <div>
                  <Calculator className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <div className="text-2xl font-bold text-white">
                    {roiData ? `${roiData.roiPercentage.toFixed(1)}%` : 'N/A'}
                  </div>
                  <div className="text-sm text-slate-400">ROI</div>
                </div>
                <div>
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">
                    {roiData ? `${roiData.paybackPeriod.toFixed(1)}y` : 'N/A'}
                  </div>
                  <div className="text-sm text-slate-400">Payback Period</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Commerce;

