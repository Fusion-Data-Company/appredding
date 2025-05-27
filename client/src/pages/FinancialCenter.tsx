import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calculator, DollarSign, TrendingUp, FileText, Download, Users, Target, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const quoteFormSchema = z.object({
  contactId: z.string().min(1, "Contact is required"),
  monthlyElectricBill: z.number().min(1, "Monthly electric bill is required"),
  roofType: z.string().optional(),
  roofAge: z.number().optional(),
  shadingLevel: z.string().optional(),
  panelType: z.string().optional()
});

const roiFormSchema = z.object({
  systemCost: z.number().min(1, "System cost is required"),
  annualSavings: z.number().min(1, "Annual savings is required"),
  financingType: z.string(),
  loanTermYears: z.number().optional(),
  interestRate: z.number().optional(),
  electricityRateIncrease: z.number().optional()
});

export default function FinancialCenter() {
  const [activeTab, setActiveTab] = useState("quote-generator");
  const [selectedContact, setSelectedContact] = useState("");
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [isROIDialogOpen, setIsROIDialogOpen] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState(null);
  const [roiAnalysis, setROIAnalysis] = useState(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get contacts for quote generation
  const { data: contactsData } = useQuery({
    queryKey: ['/api/crm/contacts'],
    queryFn: async () => {
      const response = await fetch('/api/crm/contacts?limit=100');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    }
  });

  const contacts = contactsData?.contacts || [];

  // Get revenue analytics
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['/api/financial/revenue-analytics'],
    queryFn: async () => {
      const response = await fetch('/api/financial/revenue-analytics');
      if (!response.ok) throw new Error('Failed to fetch revenue analytics');
      return response.json();
    }
  });

  // Get commission tracking
  const { data: commissionData, isLoading: commissionLoading } = useQuery({
    queryKey: ['/api/financial/commission-tracking'],
    queryFn: async () => {
      const response = await fetch('/api/financial/commission-tracking');
      if (!response.ok) throw new Error('Failed to fetch commission data');
      return response.json();
    }
  });

  const quoteForm = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      contactId: "",
      monthlyElectricBill: 0,
      roofType: "composition",
      roofAge: 10,
      shadingLevel: "minimal",
      panelType: "monocrystalline"
    }
  });

  const roiForm = useForm<z.infer<typeof roiFormSchema>>({
    resolver: zodResolver(roiFormSchema),
    defaultValues: {
      systemCost: 0,
      annualSavings: 0,
      financingType: "cash",
      loanTermYears: 20,
      interestRate: 6.5,
      electricityRateIncrease: 3.0
    }
  });

  // Generate quote mutation
  const generateQuoteMutation = useMutation({
    mutationFn: async (data: z.infer<typeof quoteFormSchema>) => {
      const response = await fetch('/api/financial/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to generate quote');
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedQuote(data.quote);
      toast({ title: "Success", description: "Solar quote generated successfully!" });
      setIsQuoteDialogOpen(false);
      quoteForm.reset();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to generate quote: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Calculate ROI mutation
  const calculateROIMutation = useMutation({
    mutationFn: async (data: z.infer<typeof roiFormSchema>) => {
      const response = await fetch('/api/financial/calculate-roi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to calculate ROI');
      return response.json();
    },
    onSuccess: (data) => {
      setROIAnalysis(data);
      toast({ title: "Success", description: "ROI analysis calculated successfully!" });
      setIsROIDialogOpen(false);
      roiForm.reset();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to calculate ROI: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  const handleQuoteSubmit = (data: z.infer<typeof quoteFormSchema>) => {
    generateQuoteMutation.mutate({
      ...data,
      contactId: parseInt(data.contactId)
    });
  };

  const handleROISubmit = (data: z.infer<typeof roiFormSchema>) => {
    calculateROIMutation.mutate(data);
  };

  const downloadQuote = () => {
    if (!generatedQuote) return;
    
    const quoteText = `
ADVANCE POWER OF REDDING - SOLAR QUOTE
Quote ID: ${generatedQuote.quoteId}
Generated: ${new Date(generatedQuote.generatedAt).toLocaleDateString()}

CUSTOMER: ${generatedQuote.contactInfo.name}
EMAIL: ${generatedQuote.contactInfo.email}
PHONE: ${generatedQuote.contactInfo.phone}

SYSTEM SPECIFICATIONS:
- Size: ${generatedQuote.systemSpecs.recommendedSize} kW
- Panels: ${generatedQuote.systemSpecs.numberOfPanels} x ${generatedQuote.systemSpecs.panelWattage}W ${generatedQuote.systemSpecs.panelType}
- Annual Production: ${generatedQuote.systemSpecs.estimatedAnnualProduction.toLocaleString()} kWh

COST BREAKDOWN:
- System Cost: $${generatedQuote.costBreakdown.systemCostBeforeIncentives.toLocaleString()}
- Federal Tax Credit: -$${generatedQuote.costBreakdown.federalTaxCredit.toLocaleString()}
- CA Rebate: -$${generatedQuote.costBreakdown.californiaRebate.toLocaleString()}
- NET COST: $${generatedQuote.costBreakdown.totalCostAfterIncentives.toLocaleString()}

FINANCIAL PROJECTION:
- Current Monthly Bill: $${generatedQuote.financialProjection.monthlyElectricBill}
- Estimated Monthly Savings: $${generatedQuote.financialProjection.estimatedMonthlySavings}
- Payback Period: ${generatedQuote.financialProjection.estimatedPaybackPeriod} years
- 20-Year Savings: $${generatedQuote.financialProjection.twentyYearSavings.toLocaleString()}

Valid until: ${new Date(generatedQuote.validUntil).toLocaleDateString()}
    `;

    const blob = new Blob([quoteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedQuote.quoteId}_quote.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-25 to-emerald-50">
      <div className="container mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Financial Operations Center
            </h1>
            <p className="text-slate-600 mt-2">Solar quote generation, ROI analysis, and revenue tracking</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pipeline Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {revenueData ? formatCurrency(revenueData.analytics.estimatedPipelineValue) : '$0'}
              </div>
              <p className="text-xs text-slate-500">Estimated total pipeline</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">
                {revenueData ? `${revenueData.analytics.conversionRate}%` : '0%'}
              </div>
              <p className="text-xs text-slate-500">Lead to qualified ratio</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Lead Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                {revenueData ? formatCurrency(revenueData.analytics.averageLeadValue) : '$0'}
              </div>
              <p className="text-xs text-slate-500">Per qualified lead</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Commissions</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {commissionData ? formatCurrency(commissionData.summary.totalCommissions) : '$0'}
              </div>
              <p className="text-xs text-slate-500">Current month estimated</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-green-200">
            <TabsTrigger value="quote-generator" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Quote Generator
            </TabsTrigger>
            <TabsTrigger value="roi-calculator" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              ROI Calculator
            </TabsTrigger>
            <TabsTrigger value="revenue-analytics" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              Revenue Analytics
            </TabsTrigger>
          </TabsList>

          {/* Quote Generator Tab */}
          <TabsContent value="quote-generator" className="space-y-6">
            <Card className="border-green-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-green-700">Solar Quote Generator</CardTitle>
                    <CardDescription>Generate accurate solar installation quotes with real California pricing</CardDescription>
                  </div>
                  <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Generate Quote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Generate Solar Quote</DialogTitle>
                        <DialogDescription>
                          Create a detailed solar installation quote for your customer
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...quoteForm}>
                        <form onSubmit={quoteForm.handleSubmit(handleQuoteSubmit)} className="space-y-4">
                          <FormField
                            control={quoteForm.control}
                            name="contactId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Customer</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select customer" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {contacts.map((contact) => (
                                      <SelectItem key={contact.id} value={contact.id.toString()}>
                                        {contact.firstName} {contact.lastName}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={quoteForm.control}
                            name="monthlyElectricBill"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Electric Bill ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={quoteForm.control}
                              name="roofType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Roof Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="composition">Composition</SelectItem>
                                      <SelectItem value="tile">Tile</SelectItem>
                                      <SelectItem value="metal">Metal</SelectItem>
                                      <SelectItem value="flat">Flat</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={quoteForm.control}
                              name="roofAge"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Roof Age (years)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      {...field} 
                                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={quoteForm.control}
                              name="shadingLevel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Shading Level</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="minimal">Minimal</SelectItem>
                                      <SelectItem value="moderate">Moderate</SelectItem>
                                      <SelectItem value="heavy">Heavy</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={quoteForm.control}
                              name="panelType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Panel Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="monocrystalline">Monocrystalline</SelectItem>
                                      <SelectItem value="polycrystalline">Polycrystalline</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setIsQuoteDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              disabled={generateQuoteMutation.isPending}
                            >
                              Generate Quote
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent>
                {generatedQuote ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-green-700">Quote #{generatedQuote.quoteId}</h3>
                      <Button onClick={downloadQuote} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Quote
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border-green-100">
                        <CardHeader>
                          <CardTitle className="text-sm text-green-600">System Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Size:</span>
                            <span className="font-medium">{generatedQuote.systemSpecs.recommendedSize} kW</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Panels:</span>
                            <span className="font-medium">{generatedQuote.systemSpecs.numberOfPanels}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Annual Production:</span>
                            <span className="font-medium">{generatedQuote.systemSpecs.estimatedAnnualProduction.toLocaleString()} kWh</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-emerald-100">
                        <CardHeader>
                          <CardTitle className="text-sm text-emerald-600">Cost Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">System Cost:</span>
                            <span className="font-medium">{formatCurrency(generatedQuote.costBreakdown.systemCostBeforeIncentives)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Federal Credit:</span>
                            <span className="font-medium text-green-600">-{formatCurrency(generatedQuote.costBreakdown.federalTaxCredit)}</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span className="text-sm">Net Cost:</span>
                            <span>{formatCurrency(generatedQuote.costBreakdown.totalCostAfterIncentives)}</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-blue-100">
                        <CardHeader>
                          <CardTitle className="text-sm text-blue-600">Financial Projection</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Monthly Savings:</span>
                            <span className="font-medium">{formatCurrency(generatedQuote.financialProjection.estimatedMonthlySavings)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Payback Period:</span>
                            <span className="font-medium">{generatedQuote.financialProjection.estimatedPaybackPeriod} years</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span className="text-sm">20-Year Savings:</span>
                            <span className="text-green-600">{formatCurrency(generatedQuote.financialProjection.twentyYearSavings)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No quote generated yet. Click "Generate Quote" to create your first solar installation quote.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ROI Calculator Tab */}
          <TabsContent value="roi-calculator" className="space-y-6">
            <Card className="border-emerald-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-emerald-700">ROI Calculator</CardTitle>
                    <CardDescription>Calculate detailed return on investment for solar installations</CardDescription>
                  </div>
                  <Dialog open={isROIDialogOpen} onOpenChange={setIsROIDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Calculate ROI
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Calculate ROI</DialogTitle>
                        <DialogDescription>
                          Analyze return on investment for solar installation
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...roiForm}>
                        <form onSubmit={roiForm.handleSubmit(handleROISubmit)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={roiForm.control}
                              name="systemCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>System Cost ($)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      {...field} 
                                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={roiForm.control}
                              name="annualSavings"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Annual Savings ($)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      {...field} 
                                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={roiForm.control}
                            name="financingType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Financing Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="cash">Cash Purchase</SelectItem>
                                    <SelectItem value="loan">Solar Loan</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {roiForm.watch("financingType") === "loan" && (
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={roiForm.control}
                                name="loanTermYears"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Loan Term (years)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        {...field} 
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={roiForm.control}
                                name="interestRate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Interest Rate (%)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        step="0.1"
                                        {...field} 
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                          
                          <FormField
                            control={roiForm.control}
                            name="electricityRateIncrease"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Annual Electricity Rate Increase (%)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    step="0.1"
                                    {...field} 
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setIsROIDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                              disabled={calculateROIMutation.isPending}
                            >
                              Calculate ROI
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent>
                {roiAnalysis ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-emerald-100">
                        <CardHeader>
                          <CardTitle className="text-lg text-emerald-600">ROI Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Financing Type:</span>
                            <span className="font-medium">{roiAnalysis.roiAnalysis.financingType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">30-Year ROI:</span>
                            <span className="font-bold text-emerald-600">{roiAnalysis.roiAnalysis.thirtyYearROI}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Net Savings:</span>
                            <span className="font-bold text-green-600">{formatCurrency(roiAnalysis.roiAnalysis.thirtyYearNetSavings)}</span>
                          </div>
                          {roiAnalysis.roiAnalysis.monthlyPayment > 0 && (
                            <div className="flex justify-between">
                              <span className="text-slate-600">Monthly Payment:</span>
                              <span className="font-medium">{formatCurrency(roiAnalysis.roiAnalysis.monthlyPayment)}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card className="border-blue-100">
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-600">10-Year Projection</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {roiAnalysis.yearlyProjection.map((year) => (
                              <div key={year.year} className="flex justify-between text-sm">
                                <span>Year {year.year}:</span>
                                <span className={year.netPosition >= 0 ? "text-green-600" : "text-red-600"}>
                                  {formatCurrency(year.netPosition)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No ROI analysis generated yet. Click "Calculate ROI" to analyze your solar investment returns.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Analytics Tab */}
          <TabsContent value="revenue-analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {revenueLoading ? (
                    <div className="text-center py-4">Loading analytics...</div>
                  ) : revenueData ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{revenueData.analytics.totalLeads}</div>
                          <div className="text-sm text-slate-600">Total Leads</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{revenueData.analytics.qualifiedLeads}</div>
                          <div className="text-sm text-slate-600">Qualified</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">{revenueData.analytics.conversionRate}%</div>
                        <div className="text-sm text-slate-600">Conversion Rate</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-slate-500">No data available</div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-600">Commission Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {commissionLoading ? (
                    <div className="text-center py-4">Loading commission data...</div>
                  ) : commissionData ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(commissionData.summary.totalCommissions)}
                        </div>
                        <div className="text-sm text-slate-600">Total Commissions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(commissionData.summary.totalRevenue)}
                        </div>
                        <div className="text-sm text-slate-600">Total Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {commissionData.summary.averageCommissionRate}%
                        </div>
                        <div className="text-sm text-slate-600">Average Commission Rate</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-slate-500">No data available</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}