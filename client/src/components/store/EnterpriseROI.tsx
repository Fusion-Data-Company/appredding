import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, BuildingIcon, ThermometerIcon, Calendar, ClockIcon, BarChart2Icon } from 'lucide-react';

const EnterpriseROI = () => {
  const [activeTab, setActiveTab] = useState("cost-savings");

  // Sample data - Enterprise ROI for different applications
  const costSavingsData = [
    { name: 'Year 1', standard: 4200, praetorian: 2800 },
    { name: 'Year 2', standard: 4300, praetorian: 2700 },
    { name: 'Year 3', standard: 4500, praetorian: 2600 },
    { name: 'Year 4', standard: 4600, praetorian: 2650 },
    { name: 'Year 5', standard: 5000, praetorian: 2700 },
    { name: 'Year 6', standard: 5200, praetorian: 2800 },
    { name: 'Year 7', standard: 5400, praetorian: 2900 },
    { name: 'Year 8', standard: 5600, praetorian: 3000 },
    { name: 'Year 9', standard: 5900, praetorian: 3100 },
    { name: 'Year 10', standard: 6200, praetorian: 3200 },
  ];

  const lifespanData = [
    { name: 'Standard Coating', years: 7 },
    { name: 'Economy Coating', years: 5 },
    { name: 'Praetorian Coating', years: 20 },
  ];

  const temperatureData = [
    { time: '8 AM', standard: 75, praetorian: 72 },
    { time: '10 AM', standard: 85, praetorian: 74 },
    { time: '12 PM', standard: 95, praetorian: 76 },
    { time: '2 PM', standard: 105, praetorian: 78 },
    { time: '4 PM', standard: 102, praetorian: 77 },
    { time: '6 PM', standard: 90, praetorian: 75 },
  ];

  const roiMetrics = [
    { name: 'Annual Energy Savings', value: 32, description: 'Average annual energy cost reduction for cooling in commercial buildings' },
    { name: 'Extended Asset Life', value: 186, description: 'Percentage increase in expected service life of treated surfaces' },
    { name: 'Maintenance Reduction', value: 47, description: 'Percentage reduction in annual maintenance requirements' },
    { name: 'Temperature Reduction', value: 30, description: 'Average surface temperature reduction in degrees Fahrenheit' },
  ];

  // Colors for charts
  const COLORS = ['#f59e0b', '#0ea5e9', '#10b981', '#6366f1'];
  const praetorianColor = '#f59e0b';
  const standardColor = '#94a3b8';

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50/50 to-white dark:from-gray-950 dark:to-gray-900/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-2 px-3 py-1 border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
            Enterprise Analytics
          </Badge>
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-300 mb-4">
            Return on Investment Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive data visualization of Praetorian's long-term value compared to standard protective coatings.
          </p>
        </div>

        <Tabs defaultValue="cost-savings" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 h-auto p-1 bg-amber-50 dark:bg-gray-800 rounded-lg mb-8 w-full max-w-3xl mx-auto">
            <TabsTrigger 
              value="cost-savings"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300 data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs font-medium">Cost Savings</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="lifespan"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300 data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-medium">Lifespan</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="temperature"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300 data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center gap-1">
                <ThermometerIcon className="h-4 w-4" />
                <span className="text-xs font-medium">Temperature</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="roi-metrics"
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300 data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center gap-1">
                <BarChart2Icon className="h-4 w-4" />
                <span className="text-xs font-medium">ROI Metrics</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-amber-100 dark:border-gray-700 p-6"
          >
            <TabsContent value="cost-savings" className="mt-0 pt-4">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2">
                  Energy Costs: 10-Year Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Annual energy costs for cooling a 10,000 sq ft commercial building with standard coating vs. Praetorian's ceramic technology.
                </p>
                
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={costSavingsData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="standard" 
                        name="Standard Coating" 
                        stroke={standardColor} 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="praetorian" 
                        name="Praetorian Coating" 
                        stroke={praetorianColor} 
                        strokeWidth={3}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-amber-100 dark:border-amber-900/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-amber-600" />
                        10-Year Cost Comparison
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Standard Coating:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">$50,700</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Praetorian Coating:</span>
                          <span className="font-medium text-amber-700 dark:text-amber-300">$28,550</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Total Savings:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">$22,150</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-amber-100 dark:border-amber-900/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-amber-600" />
                        Compound Benefits
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Average Annual Savings:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">$2,215</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Percentage Reduction:</span>
                          <span className="font-medium text-amber-700 dark:text-amber-300">43.7%</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">ROI Timeframe:</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">~2.2 years</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="lifespan" className="mt-0 pt-4">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2">
                  Product Lifespan Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Expected service life before replacement or major maintenance is required, based on independent testing.
                </p>
                
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={lifespanData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Years', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value} years`, 'Lifespan']} />
                      <Bar dataKey="years" fill={praetorianColor} name="Expected Lifespan">
                        {lifespanData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.name === 'Praetorian Coating' ? praetorianColor : standardColor} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-amber-100 dark:border-amber-900/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <BuildingIcon className="h-4 w-4 text-amber-600" />
                        Replacement Cost Analysis
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Standard (over 20 years):</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">2-3 replacements</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Praetorian (over 20 years):</span>
                          <span className="font-medium text-amber-700 dark:text-amber-300">0-1 replacements</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Labor Cost Savings:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">$35,000+</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-amber-100 dark:border-amber-900/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-amber-600" />
                        Maintenance Intervals
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Standard Coating:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">Every 1-2 years</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Praetorian Coating:</span>
                          <span className="font-medium text-amber-700 dark:text-amber-300">Every 5-7 years</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Maintenance Reduction:</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">71%</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="temperature" className="mt-0 pt-4">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2">
                  Surface Temperature Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Surface temperature readings on a typical summer day for identical structure sections with different coatings.
                </p>
                
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={temperatureData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[70, 110]} tickFormatter={(value) => `${value}°F`} />
                      <Tooltip formatter={(value) => [`${value}°F`, 'Temperature']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="standard" 
                        name="Standard Coating" 
                        stroke={standardColor} 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="praetorian" 
                        name="Praetorian Coating" 
                        stroke={praetorianColor} 
                        strokeWidth={3}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-amber-100 dark:border-amber-900/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <ThermometerIcon className="h-4 w-4 text-amber-600" />
                        Temperature Differential
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Peak Temperature Difference:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">27°F</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Average Difference:</span>
                          <span className="font-medium text-amber-700 dark:text-amber-300">23.5°F</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Percentage Reduction:</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">25.7%</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-amber-100 dark:border-amber-900/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-amber-600" />
                        Energy Impact
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Cooling Load Reduction:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">32%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">HVAC Runtime Reduction:</span>
                          <span className="font-medium text-amber-700 dark:text-amber-300">27%</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Equipment Lifespan Increase:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">35%</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="roi-metrics" className="mt-0 pt-4">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2">
                  Key Performance Indicators
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Critical ROI metrics demonstrating Praetorian's value proposition across key measurement categories.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roiMetrics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {roiMetrics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Value']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <div className="space-y-4">
                      {roiMetrics.map((metric, index) => (
                        <Card key={index} className="border-l-4" style={{ borderLeftColor: COLORS[index % COLORS.length] }}>
                          <CardContent className="py-4">
                            <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
                              {metric.name}: <span className="text-gray-700 dark:text-gray-300">{metric.value}%</span>
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {metric.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-amber-50/80 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
                        Enterprise ROI Summary
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Praetorian coatings provide an average return of 3.7x the initial investment over a 10-year period when factoring all cost avoidance and energy efficiency metrics. Most commercial applications achieve break-even in 2.2 years.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </section>
  );
};

export default EnterpriseROI;