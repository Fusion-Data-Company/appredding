import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingUp, DollarSign, Zap, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculatorResults {
  currentAnnualCost: number;
  demandChargeTotal: number;
  energyChargeTotal: number;
  withSolarAnnualCost: number;
  annualSavings: number;
  percentReduction: number;
  paybackYears: number;
  tenYearSavings: number;
}

const DemandChargeCalculator = ({ onQualified }: { onQualified?: (data: any) => void }) => {
  const [peakDemand, setPeakDemand] = useState<string>("450");
  const [monthlyUsage, setMonthlyUsage] = useState<string>("50000");
  const [rateSchedule, setRateSchedule] = useState<string>("B-19");
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  const rateSchedules = {
    "B-10": { demandCharge: 15, energyRate: 0.28, threshold: 500 },
    "B-19": { demandCharge: 20, energyRate: 0.32, threshold: 999 },
    "B-20": { demandCharge: 18, energyRate: 0.29, threshold: 5000 },
    "E-19": { demandCharge: 22, energyRate: 0.35, threshold: 999 }
  };

  const calculateSavings = () => {
    const demand = parseFloat(peakDemand) || 0;
    const usage = parseFloat(monthlyUsage) || 0;
    const rate = rateSchedules[rateSchedule as keyof typeof rateSchedules];

    // Current costs
    const monthlyDemandCharge = demand * rate.demandCharge;
    const monthlyEnergyCharge = usage * rate.energyRate;
    const monthlyTotal = monthlyDemandCharge + monthlyEnergyCharge;
    const annualCost = monthlyTotal * 12;

    // With solar + battery (40-60% demand reduction, 70% energy offset)
    const demandReduction = 0.55;
    const energyOffset = 0.70;

    const newMonthlyDemandCharge = demand * (1 - demandReduction) * rate.demandCharge;
    const newMonthlyEnergyCharge = usage * (1 - energyOffset) * rate.energyRate;
    const newMonthlyTotal = newMonthlyDemandCharge + newMonthlyEnergyCharge;
    const newAnnualCost = newMonthlyTotal * 12;

    const savings = annualCost - newAnnualCost;
    const percentReduction = (savings / annualCost) * 100;

    // System sizing and cost
    const systemSizeKw = demand * 0.8; // 80% of peak demand
    const systemCost = systemSizeKw * 2500; // $2.50/W commercial
    const netCostAfterIncentives = systemCost * 0.35; // After ITC + depreciation + SGIP

    const payback = netCostAfterIncentives / savings;
    const tenYearSavings = (savings * 10) - systemCost;

    const calculatedResults: CalculatorResults = {
      currentAnnualCost: annualCost,
      demandChargeTotal: monthlyDemandCharge * 12,
      energyChargeTotal: monthlyEnergyCharge * 12,
      withSolarAnnualCost: newAnnualCost,
      annualSavings: savings,
      percentReduction,
      paybackYears: payback,
      tenYearSavings
    };

    setResults(calculatedResults);
    setShowResults(true);
    setPulseAnimation(true);

    // Qualify lead if savings > $40K annually
    if (savings > 40000 && onQualified) {
      onQualified({
        peakDemand: demand,
        monthlyUsage: usage,
        rateSchedule,
        estimatedSavings: savings,
        qualificationLevel: savings > 80000 ? "emergency" : "strategic"
      });
    }

    setTimeout(() => setPulseAnimation(false), 2000);
  };

  useEffect(() => {
    if (peakDemand && monthlyUsage) {
      const timer = setTimeout(() => calculateSavings(), 500);
      return () => clearTimeout(timer);
    }
  }, [peakDemand, monthlyUsage, rateSchedule]);

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse" />

      <div className="relative card-elite glow-red p-8 overflow-hidden">
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="p-3 bg-red-500/20 rounded-xl"
              animate={pulseAnimation ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 0.6 }}
            >
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </motion.div>
            <div>
              <h3 className="text-3xl font-bold text-white">Demand Charge Horror Calculator</h3>
              <p className="text-red-300">See how much you're bleeding every month</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <Label className="text-gray-300 mb-2 block">Peak Demand (kW)</Label>
            <div className="relative">
              <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-400" />
              <Input
                type="number"
                value={peakDemand}
                onChange={(e) => setPeakDemand(e.target.value)}
                className="bg-gray-800/80 border-orange-700/50 text-white pl-11 text-lg font-semibold"
                placeholder="450"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Monthly Usage (kWh)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-400" />
              <Input
                type="number"
                value={monthlyUsage}
                onChange={(e) => setMonthlyUsage(e.target.value)}
                className="bg-gray-800/80 border-orange-700/50 text-white pl-11 text-lg font-semibold"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">PG&E Rate Schedule</Label>
            <select
              value={rateSchedule}
              onChange={(e) => setRateSchedule(e.target.value)}
              className="w-full bg-gray-800/80 border border-orange-700/50 text-white rounded-md px-4 py-2.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="B-10">B-10 (Secondary)</option>
              <option value="B-19">B-19 (Medium)</option>
              <option value="B-20">B-20 (Primary)</option>
              <option value="E-19">E-19 TOU</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* The Horror: Current Cost */}
              <div className="bg-gradient-to-br from-red-900/40 to-red-950/40 border-2 border-red-500/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                    <h4 className="text-xl font-bold text-red-400">YOUR CURRENT ANNUAL BLEED</h4>
                  </div>
                  <motion.div
                    className="text-5xl font-black text-red-400"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ${results.currentAnnualCost.toLocaleString()}
                  </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Demand Charges:</span>
                    <span className="text-red-300 font-bold">${results.demandChargeTotal.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Energy Charges:</span>
                    <span className="text-red-300 font-bold">${results.energyChargeTotal.toLocaleString()}/yr</span>
                  </div>
                </div>
              </div>

              {/* The Solution: With Solar */}
              <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 border-2 border-green-500/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                    <h4 className="text-xl font-bold text-green-400">WITH SOL-ARK SOLAR + BATTERY</h4>
                  </div>
                  <div className="text-5xl font-black text-green-400">
                    ${results.withSolarAnnualCost.toLocaleString()}
                  </div>
                </div>
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">ANNUAL SAVINGS</p>
                    <p className="text-4xl font-black text-green-400 mb-1">
                      ${results.annualSavings.toLocaleString()}
                    </p>
                    <p className="text-green-300 text-lg font-semibold">
                      {results.percentReduction.toFixed(1)}% Cost Reduction
                    </p>
                  </div>
                </div>
              </div>

              {/* ROI Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-6 text-center">
                  <Calculator className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-2">PAYBACK PERIOD</p>
                  <p className="text-4xl font-black text-orange-400">
                    {results.paybackYears.toFixed(1)} <span className="text-2xl">years</span>
                  </p>
                  <p className="text-orange-300 text-sm mt-2">After ITC + Depreciation + SGIP</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6 text-center">
                  <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-2">10-YEAR NET BENEFIT</p>
                  <p className="text-4xl font-black text-blue-400">
                    ${(results.tenYearSavings / 1000).toFixed(0)}K
                  </p>
                  <p className="text-blue-300 text-sm mt-2">Total savings minus system cost</p>
                </div>
              </div>

              {/* CTA */}
              {results.annualSavings > 40000 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-center"
                >
                  <p className="text-white font-bold text-xl mb-3">
                    🚨 PRIORITY QUALIFICATION: You're losing ${(results.annualSavings / 12).toLocaleString()}/month
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-6"
                    onClick={() => onQualified && onQualified({
                      peakDemand: parseFloat(peakDemand),
                      monthlyUsage: parseFloat(monthlyUsage),
                      rateSchedule,
                      estimatedSavings: results.annualSavings,
                      qualificationLevel: "emergency"
                    })}
                  >
                    Get Same-Day Energy Audit (Priority Track)
                  </Button>
                  <p className="text-white/90 text-sm mt-3">
                    ⚡ Senior energy analyst callback within 4 hours
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DemandChargeCalculator;
