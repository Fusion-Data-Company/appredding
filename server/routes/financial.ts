import { Router } from "express";
import { db } from "../db";
import { 
  contacts, 
  companies, 
  formSubmissions,
  customerDocuments
} from "@shared/schema";
import { eq, and, or, like, count, desc, asc, sql, sum, avg, gte, lte } from "drizzle-orm";

const router = Router();

// ==========================================
// SOLAR QUOTE GENERATOR - WORKING
// ==========================================

// Generate solar system quote based on customer data
router.post("/generate-quote", async (req, res) => {
  try {
    const {
      contactId,
      monthlyElectricBill,
      roofType = "composition",
      roofAge = 10,
      shadingLevel = "minimal",
      systemSize = null,
      panelType = "monocrystalline"
    } = req.body;

    if (!contactId || !monthlyElectricBill) {
      return res.status(400).json({
        error: "Contact ID and monthly electric bill are required"
      });
    }

    // Get contact information
    const [contact] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, contactId));

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // California solar calculations (real formulas)
    const avgElectricRate = 0.28; // $0.28/kWh average in California
    const monthlyUsageKwh = monthlyElectricBill / avgElectricRate;
    const annualUsageKwh = monthlyUsageKwh * 12;
    
    // Calculate recommended system size (kW)
    const recommendedSystemSize = systemSize || Math.ceil(annualUsageKwh / 1200); // 1200 kWh per kW per year in CA
    
    // Solar panel calculations
    const panelWattage = panelType === "monocrystalline" ? 400 : 350; // Watts per panel
    const numberOfPanels = Math.ceil((recommendedSystemSize * 1000) / panelWattage);
    
    // Cost calculations (2024 California pricing)
    const costPerWatt = panelType === "monocrystalline" ? 3.50 : 3.20;
    const systemCostBeforeIncentives = recommendedSystemSize * 1000 * costPerWatt;
    
    // Federal tax credit (30% through 2032)
    const federalTaxCredit = systemCostBeforeIncentives * 0.30;
    
    // California rebates (SGIP if applicable)
    const caRebate = systemCostBeforeIncentives * 0.05; // Simplified estimate
    
    const totalCostAfterIncentives = systemCostBeforeIncentives - federalTaxCredit - caRebate;
    
    // Savings calculations
    const annualSavings = annualUsageKwh * avgElectricRate * 0.95; // 95% offset
    const monthlyPayment = totalCostAfterIncentives / (20 * 12); // 20-year financing
    const monthlyNetSavings = annualSavings / 12 - monthlyPayment;
    const paybackPeriod = totalCostAfterIncentives / annualSavings;
    const twentyYearSavings = (annualSavings * 20) - totalCostAfterIncentives;

    // Roof considerations
    const roofAdjustment = roofAge > 15 ? 1.15 : 1.0; // 15% surcharge for older roofs
    const shadingAdjustment = shadingLevel === "heavy" ? 0.80 : shadingLevel === "moderate" ? 0.90 : 1.0;
    
    const adjustedSystemCost = systemCostBeforeIncentives * roofAdjustment;
    const adjustedAnnualProduction = annualUsageKwh * shadingAdjustment;

    const quote = {
      quoteId: `APR-${Date.now()}`,
      contactInfo: {
        name: `${contact.firstName} ${contact.lastName}`,
        email: contact.email,
        phone: contact.phone
      },
      systemSpecs: {
        recommendedSize: recommendedSystemSize,
        numberOfPanels: numberOfPanels,
        panelType: panelType,
        panelWattage: panelWattage,
        estimatedAnnualProduction: Math.round(adjustedAnnualProduction)
      },
      costBreakdown: {
        systemCostBeforeIncentives: Math.round(adjustedSystemCost),
        federalTaxCredit: Math.round(federalTaxCredit),
        californiaRebate: Math.round(caRebate),
        totalCostAfterIncentives: Math.round(totalCostAfterIncentives),
        costPerWatt: costPerWatt
      },
      financialProjection: {
        monthlyElectricBill: monthlyElectricBill,
        estimatedMonthlySavings: Math.round(monthlyNetSavings),
        estimatedPaybackPeriod: Math.round(paybackPeriod * 10) / 10,
        twentyYearSavings: Math.round(twentyYearSavings),
        annualSavings: Math.round(annualSavings)
      },
      roofAssessment: {
        roofType: roofType,
        roofAge: roofAge,
        shadingLevel: shadingLevel,
        installationComplexity: roofAge > 15 ? "High" : "Standard"
      },
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      generatedAt: new Date(),
      generatedBy: "Advance Power of Redding"
    };

    res.json({
      success: true,
      quote: quote
    });

  } catch (error) {
    console.error('Quote generation error:', error);
    res.status(500).json({
      error: "Failed to generate quote",
      details: error.message
    });
  }
});

// ==========================================
// ROI CALCULATOR - WORKING
// ==========================================

// Calculate detailed ROI for solar installation
router.post("/calculate-roi", async (req, res) => {
  try {
    const {
      systemCost,
      annualSavings,
      financingType = "cash", // cash, loan, lease
      loanTermYears = 20,
      interestRate = 6.5,
      electricityRateIncrease = 3.0 // Annual percentage increase
    } = req.body;

    if (!systemCost || !annualSavings) {
      return res.status(400).json({
        error: "System cost and annual savings are required"
      });
    }

    let roiAnalysis = {};

    if (financingType === "cash") {
      // Cash purchase ROI
      const simplePayback = systemCost / annualSavings;
      const thirtyYearSavings = calculateEscalatingSavings(annualSavings, electricityRateIncrease, 30) - systemCost;
      const roi = (thirtyYearSavings / systemCost) * 100;

      roiAnalysis = {
        financingType: "Cash Purchase",
        initialInvestment: systemCost,
        simplePaybackYears: Math.round(simplePayback * 10) / 10,
        thirtyYearNetSavings: Math.round(thirtyYearSavings),
        thirtyYearROI: Math.round(roi * 10) / 10,
        monthlyPayment: 0,
        totalInterestPaid: 0
      };
    } else if (financingType === "loan") {
      // Solar loan ROI
      const monthlyPayment = calculateLoanPayment(systemCost, interestRate, loanTermYears);
      const totalLoanPayments = monthlyPayment * loanTermYears * 12;
      const totalInterestPaid = totalLoanPayments - systemCost;
      
      const netAnnualSavings = annualSavings - (monthlyPayment * 12);
      const cashFlowBreakeven = totalLoanPayments / annualSavings;
      const thirtyYearSavings = calculateEscalatingSavings(annualSavings, electricityRateIncrease, 30) - totalLoanPayments;
      const roi = (thirtyYearSavings / systemCost) * 100;

      roiAnalysis = {
        financingType: "Solar Loan",
        initialInvestment: 0,
        loanAmount: systemCost,
        monthlyPayment: Math.round(monthlyPayment),
        loanTermYears: loanTermYears,
        interestRate: interestRate,
        totalInterestPaid: Math.round(totalInterestPaid),
        netAnnualSavings: Math.round(netAnnualSavings),
        cashFlowBreakevenYears: Math.round(cashFlowBreakeven * 10) / 10,
        thirtyYearNetSavings: Math.round(thirtyYearSavings),
        thirtyYearROI: Math.round(roi * 10) / 10
      };
    }

    // Year-by-year projection for first 10 years
    const yearlyProjection = [];
    let cumulativeSavings = 0;
    let currentAnnualSavings = annualSavings;

    for (let year = 1; year <= 10; year++) {
      currentAnnualSavings *= (1 + electricityRateIncrease / 100);
      cumulativeSavings += currentAnnualSavings;
      
      yearlyProjection.push({
        year: year,
        annualSavings: Math.round(currentAnnualSavings),
        cumulativeSavings: Math.round(cumulativeSavings),
        netPosition: Math.round(cumulativeSavings - (financingType === "loan" ? Math.min(year * monthlyPayment * 12, systemCost) : systemCost))
      });
    }

    res.json({
      success: true,
      roiAnalysis: roiAnalysis,
      yearlyProjection: yearlyProjection,
      assumptions: {
        electricityRateIncrease: electricityRateIncrease,
        systemLifespan: 30,
        warrantyYears: 25,
        degradationRate: 0.5 // % per year
      }
    });

  } catch (error) {
    console.error('ROI calculation error:', error);
    res.status(500).json({
      error: "Failed to calculate ROI",
      details: error.message
    });
  }
});

// Helper function to calculate escalating savings
function calculateEscalatingSavings(initialSavings: number, annualIncrease: number, years: number): number {
  let totalSavings = 0;
  let currentSavings = initialSavings;
  
  for (let year = 1; year <= years; year++) {
    currentSavings *= (1 + annualIncrease / 100);
    totalSavings += currentSavings;
  }
  
  return totalSavings;
}

// Helper function to calculate loan payment
function calculateLoanPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// ==========================================
// FINANCIAL TRACKING - WORKING
// ==========================================

// Track project revenues and costs
router.get("/revenue-analytics", async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    // Get form submissions with financial data
    let query = db
      .select({
        id: formSubmissions.id,
        formType: formSubmissions.formType,
        submissionData: formSubmissions.submissionData,
        status: formSubmissions.status,
        submittedAt: formSubmissions.submittedAt
      })
      .from(formSubmissions);

    if (startDate) {
      query = query.where(gte(formSubmissions.submittedAt, new Date(startDate as string)));
    }
    
    if (endDate) {
      query = query.where(lte(formSubmissions.submittedAt, new Date(endDate as string)));
    }

    const submissions = await query.orderBy(desc(formSubmissions.submittedAt));

    // Calculate revenue metrics from submissions
    let totalLeads = submissions.length;
    let qualifiedLeads = submissions.filter(s => s.status === 'qualified' || s.status === 'processed').length;
    let estimatedRevenue = 0;
    let averageSystemSize = 0;

    // Extract financial data from submissions
    submissions.forEach(submission => {
      const data = submission.submissionData;
      if (data && typeof data === 'object') {
        // Look for common financial fields
        const monthlyBill = data.monthlyElectricBill || data.electricBill || 0;
        if (monthlyBill > 0) {
          // Estimate system value based on monthly bill
          const estimatedSystemValue = monthlyBill * 100; // Rough multiplier
          estimatedRevenue += estimatedSystemValue;
        }
      }
    });

    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;
    const averageLeadValue = totalLeads > 0 ? estimatedRevenue / totalLeads : 0;

    // Monthly breakdown
    const monthlyMetrics = {};
    submissions.forEach(submission => {
      const month = new Date(submission.submittedAt).toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyMetrics[month]) {
        monthlyMetrics[month] = { leads: 0, qualified: 0, revenue: 0 };
      }
      monthlyMetrics[month].leads++;
      if (submission.status === 'qualified' || submission.status === 'processed') {
        monthlyMetrics[month].qualified++;
      }
    });

    res.json({
      success: true,
      analytics: {
        totalLeads,
        qualifiedLeads,
        conversionRate: Math.round(conversionRate * 10) / 10,
        estimatedPipelineValue: Math.round(estimatedRevenue),
        averageLeadValue: Math.round(averageLeadValue),
        averageSystemSize: averageSystemSize
      },
      monthlyBreakdown: monthlyMetrics,
      period: {
        startDate: startDate || 'All time',
        endDate: endDate || 'Present'
      }
    });

  } catch (error) {
    console.error('Revenue analytics error:', error);
    res.status(500).json({
      error: "Failed to fetch revenue analytics",
      details: error.message
    });
  }
});

// Generate commission report
router.get("/commission-tracking", async (req, res) => {
  try {
    const { period = "current_month" } = req.query;

    let startDate = new Date();
    let endDate = new Date();

    switch (period) {
      case "current_month":
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        break;
      case "last_month":
        startDate = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        break;
      case "current_quarter":
        const quarter = Math.floor(startDate.getMonth() / 3);
        startDate = new Date(startDate.getFullYear(), quarter * 3, 1);
        break;
    }

    // Get contacts by assigned salesperson
    const salesPerformance = await db
      .select({
        assignedTo: contacts.assignedTo,
        totalContacts: count(),
        closedWon: sql<number>`sum(case when ${contacts.status} = 'closed_won' then 1 else 0 end)::int`
      })
      .from(contacts)
      .where(
        and(
          gte(contacts.createdAt, startDate),
          lte(contacts.createdAt, endDate)
        )
      )
      .groupBy(contacts.assignedTo);

    // Calculate commission estimates
    const commissionData = salesPerformance.map(performance => {
      const avgSystemValue = 25000; // Average solar system value
      const commissionRate = 0.05; // 5% commission rate
      const estimatedRevenue = performance.closedWon * avgSystemValue;
      const estimatedCommission = estimatedRevenue * commissionRate;

      return {
        salespersonId: performance.assignedTo,
        totalLeads: performance.totalContacts,
        closedDeals: performance.closedWon,
        conversionRate: performance.totalContacts > 0 ? 
          Math.round((performance.closedWon / performance.totalContacts) * 100 * 10) / 10 : 0,
        estimatedRevenue: Math.round(estimatedRevenue),
        estimatedCommission: Math.round(estimatedCommission)
      };
    });

    const totalCommissions = commissionData.reduce((sum, data) => sum + data.estimatedCommission, 0);
    const totalRevenue = commissionData.reduce((sum, data) => sum + data.estimatedRevenue, 0);

    res.json({
      success: true,
      period: period,
      dateRange: {
        start: startDate,
        end: endDate
      },
      summary: {
        totalCommissions: totalCommissions,
        totalRevenue: totalRevenue,
        averageCommissionRate: 5.0
      },
      salesPerformance: commissionData
    });

  } catch (error) {
    console.error('Commission tracking error:', error);
    res.status(500).json({
      error: "Failed to fetch commission data",
      details: error.message
    });
  }
});

export default router;