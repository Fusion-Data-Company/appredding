import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, PieChart, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ROIInputs {
  systemSize: number;
  peakDemand: number;
  monthlyUsage: number;
  avgEnergyRate: number;
  demandChargeRate: number;
  corporateTaxRate: number;
  financingType: "cash" | "loan" | "ppa";
}

interface ROIResults {
  systemCost: number;
  itcCredit: number;
  depreciation: number;
  sgipRebate: number;
  netCost: number;
  annualSavings: number;
  paybackYears: number;
  roi25Year: number;
  npv: number;
  irr: number;
  cashFlows: number[];
}

const AdvancedROICalculator = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    systemSize: 500,
    peakDemand: 450,
    monthlyUsage: 50000,
    avgEnergyRate: 0.32,
    demandChargeRate: 20,
    corporateTaxRate: 21,
    financingType: "cash"
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  const calculateROI = () => {
    const {
      systemSize,
      peakDemand,
      monthlyUsage,
      avgEnergyRate,
      demandChargeRate,
      corporateTaxRate
    } = inputs;

    // System costs
    const costPerWatt = 2.50; // $2.50/W commercial
    const batterySizeKwh = peakDemand * 0.6; // 60% of peak demand
    const batteryCost = batterySizeKwh * 800; // $800/kWh
    const totalSystemCost = (systemSize * 1000 * costPerWatt) + batteryCost;

    // Federal ITC (30%)
    const itcAmount = totalSystemCost * 0.30;

    // Bonus Depreciation (60% in 2024)
    const depreciableBasis = totalSystemCost - (itcAmount * 0.5); // Reduce by 50% of ITC
    const bonusDepreciation = depreciableBasis * 0.60;
    const depreciationTaxSavings = bonusDepreciation * (corporateTaxRate / 100);

    // SGIP Rebate
    const sgipRate = 200; // $200/kWh (standard tier)
    const sgipAmount = batterySizeKwh * sgipRate;

    // Net cost after incentives
    const netCostAfterIncentives = totalSystemCost - itcAmount - depreciationTaxSavings - sgipAmount;

    // Annual savings calculations
    const solarProduction = systemSize * 1400; // 1400 kWh/kW/year in NorCal
    const energySavings = solarProduction * avgEnergyRate * 0.75; // 75% self-consumption

    // Demand charge reduction
    const demandReduction = 0.55; // 55% average reduction with battery
    const demandChargeSavings = (peakDemand * demandReduction * demandChargeRate) * 12;

    const totalAnnualSavings = energySavings + demandChargeSavings;

    // Payback
    const simplePayback = netCostAfterIncentives / totalAnnualSavings;

    // 25-year cash flow
    const cashFlows: number[] = [];
    let cumulativeCashFlow = -netCostAfterIncentives;
    const degradation = 0.005; // 0.5% annual degradation
    const utilityEscalation = 0.06; // 6% annual rate increase
    const maintenanceCost = systemSize * 15; // $15/kW/year

    for (let year = 1; year <= 25; year++) {
      const yearProduction = solarProduction * Math.pow(1 - degradation, year - 1);
      const yearEnergyRate = avgEnergyRate * Math.pow(1 + utilityEscalation, year - 1);
      const yearEnergySavings = yearProduction * yearEnergyRate * 0.75;
      const yearDemandSavings = demandChargeSavings * Math.pow(1 + utilityEscalation, year - 1);
      const yearMaintenance = maintenanceCost * Math.pow(1.03, year - 1); // 3% maintenance escalation

      const yearCashFlow = yearEnergySavings + yearDemandSavings - yearMaintenance;
      cumulativeCashFlow += yearCashFlow;
      cashFlows.push(cumulativeCashFlow);
    }

    // NPV calculation (8% discount rate)
    const discountRate = 0.08;
    let npv = -netCostAfterIncentives;
    for (let year = 1; year <= 25; year++) {
      const yearProduction = solarProduction * Math.pow(1 - degradation, year - 1);
      const yearEnergyRate = avgEnergyRate * Math.pow(1 + utilityEscalation, year - 1);
      const yearEnergySavings = yearProduction * yearEnergyRate * 0.75;
      const yearDemandSavings = demandChargeSavings * Math.pow(1 + utilityEscalation, year - 1);
      const yearMaintenance = maintenanceCost * Math.pow(1.03, year - 1);
      const yearCashFlow = yearEnergySavings + yearDemandSavings - yearMaintenance;

      npv += yearCashFlow / Math.pow(1 + discountRate, year);
    }

    // IRR calculation (simplified - using approximation)
    const irr = ((cashFlows[24] + netCostAfterIncentives) / netCostAfterIncentives) ** (1/25) - 1;

    setResults({
      systemCost: totalSystemCost,
      itcCredit: itcAmount,
      depreciation: depreciationTaxSavings,
      sgipRebate: sgipAmount,
      netCost: netCostAfterIncentives,
      annualSavings: totalAnnualSavings,
      paybackYears: simplePayback,
      roi25Year: ((cashFlows[24] + netCostAfterIncentives) / netCostAfterIncentives) * 100,
      npv: npv,
      irr: irr * 100,
      cashFlows: cashFlows
    });

    setShowDetailedAnalysis(true);
  };

  const updateInput = (field: keyof ROIInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-50" />

      <div className="relative card-elite glow-blue p-8">
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="p-4 bg-blue-500/20 rounded-xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Calculator className="h-8 w-8 text-blue-400" />
          </motion.div>
          <div>
            <h3 className="text-3xl font-bold text-white">Advanced NPV/IRR Calculator</h3>
            <p className="text-gray-400">Comprehensive 25-year financial modeling</p>
          </div>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <Label className="text-gray-300 mb-2 block">System Size (kW)</Label>
            <Input
              type="number"
              value={inputs.systemSize}
              onChange={(e) => updateInput("systemSize", parseFloat(e.target.value))}
              className="bg-gray-800/80 border-blue-700/50 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Peak Demand (kW)</Label>
            <Input
              type="number"
              value={inputs.peakDemand}
              onChange={(e) => updateInput("peakDemand", parseFloat(e.target.value))}
              className="bg-gray-800/80 border-blue-700/50 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Monthly Usage (kWh)</Label>
            <Input
              type="number"
              value={inputs.monthlyUsage}
              onChange={(e) => updateInput("monthlyUsage", parseFloat(e.target.value))}
              className="bg-gray-800/80 border-blue-700/50 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Avg Energy Rate ($/kWh)</Label>
            <Input
              type="number"
              step="0.01"
              value={inputs.avgEnergyRate}
              onChange={(e) => updateInput("avgEnergyRate", parseFloat(e.target.value))}
              className="bg-gray-800/80 border-blue-700/50 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Demand Charge ($/kW)</Label>
            <Input
              type="number"
              value={inputs.demandChargeRate}
              onChange={(e) => updateInput("demandChargeRate", parseFloat(e.target.value))}
              className="bg-gray-800/80 border-blue-700/50 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Corporate Tax Rate (%)</Label>
            <Input
              type="number"
              value={inputs.corporateTaxRate}
              onChange={(e) => updateInput("corporateTaxRate", parseFloat(e.target.value))}
              className="bg-gray-800/80 border-blue-700/50 text-white"
            />
          </div>
        </div>

        <Button
          onClick={calculateROI}
          size="lg"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold"
        >
          <Calculator className="h-5 w-5 mr-2" />
          Calculate Complete ROI Analysis
        </Button>

        {/* Results Section */}
        {results && showDetailedAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-8 space-y-6"
          >
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 border border-green-500/50 rounded-xl p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">Payback Period</p>
                <p className="text-4xl font-black text-green-400">{results.paybackYears.toFixed(1)}</p>
                <p className="text-green-300 text-sm mt-1">years</p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border border-blue-500/50 rounded-xl p-6 text-center">
                <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">Net Present Value</p>
                <p className="text-4xl font-black text-blue-400">${(results.npv / 1000).toFixed(0)}K</p>
                <p className="text-blue-300 text-sm mt-1">@ 8% discount</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-purple-500/50 rounded-xl p-6 text-center">
                <PieChart className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">Internal Rate of Return</p>
                <p className="text-4xl font-black text-purple-400">{results.irr.toFixed(1)}%</p>
                <p className="text-purple-300 text-sm mt-1">annualized</p>
              </div>

              <div className="bg-gradient-to-br from-orange-900/40 to-orange-950/40 border border-orange-500/50 rounded-xl p-6 text-center">
                <BarChart3 className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">25-Year ROI</p>
                <p className="text-4xl font-black text-orange-400">{results.roi25Year.toFixed(0)}%</p>
                <p className="text-orange-300 text-sm mt-1">total return</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="card-elite glow-orange p-6">
              <h4 className="text-white font-bold text-xl mb-4">Investment Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total System Cost:</span>
                  <span className="text-white font-bold text-lg">${results.systemCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-400">
                  <span>30% ITC Credit:</span>
                  <span className="font-bold">-${results.itcCredit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-400">
                  <span>Bonus Depreciation Tax Savings:</span>
                  <span className="font-bold">-${results.depreciation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-400">
                  <span>SGIP Battery Rebate:</span>
                  <span className="font-bold">-${results.sgipRebate.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
                  <span className="text-white font-bold text-lg">Net Investment:</span>
                  <span className="text-orange-400 font-black text-2xl">${results.netCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Annual Savings */}
            <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 border border-green-500/50 rounded-xl p-6">
              <h4 className="text-green-400 font-bold text-xl mb-4">Annual Savings (Year 1)</h4>
              <div className="text-center">
                <p className="text-6xl font-black text-green-400 mb-2">${results.annualSavings.toLocaleString()}</p>
                <p className="text-gray-300">per year</p>
                <p className="text-green-300 mt-2 text-lg">= ${(results.annualSavings / 12).toLocaleString()}/month savings</p>
              </div>
            </div>

            {/* Download CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Full 47-Page Financial Analysis
              </Button>
              <p className="text-gray-400 text-sm mt-3">
                Includes 25-year cash flow projections, sensitivity analysis, and tax documentation
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdvancedROICalculator;
