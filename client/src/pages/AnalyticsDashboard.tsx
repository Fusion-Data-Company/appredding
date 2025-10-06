import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton, StatsSkeleton, CardSkeleton } from "@/components/ui/skeleton";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from "recharts";
import { 
  TrendingUp, Users, Zap, MapPin, Calendar, DollarSign, 
  Wrench, Battery, Search, Download, Filter 
} from "lucide-react";
import { motion } from "framer-motion";

interface YearlyStats {
  year: number;
  totalInstallations: number;
  totalSystemCapacity: number;
  averageSystemSize: number;
  totalRevenue: number;
  customerCount: number;
  activeCustomers: number;
  maintenanceCalls: number;
}

interface CustomersByDecade {
  decade: string;
  count: number;
  totalCapacity: number;
  averageSystemSize: number;
}

interface GeographicData {
  zipCode: string;
  customerCount: number;
  totalCapacity: number;
  averageSystemCost: number;
  lastInstallation: string;
}

interface TechnologyTrend {
  year: number;
  inverterType: string;
  batterySystemCount: number;
  totalInstallations: number;
  averageSystemSize: number;
  batteryPercentage: number;
}

const COLORS = ['#FF6B35', '#F7931E', '#FFD700', '#FF4444', '#FF8C42', '#FFB347'];

export default function AnalyticsDashboard() {
  const [selectedYearRange, setSelectedYearRange] = useState({ start: 1999, end: new Date().getFullYear() });
  const [searchYear, setSearchYear] = useState("");
  const [selectedZipCode, setSelectedZipCode] = useState("");

  // Fetch yearly analytics
  const { data: yearlyData = [], isLoading: yearlyLoading } = useQuery({
    queryKey: ['/api/crm/analytics/yearly', selectedYearRange.start, selectedYearRange.end],
    queryFn: async () => {
      const response = await fetch(`/api/crm/analytics/yearly?startYear=${selectedYearRange.start}&endYear=${selectedYearRange.end}`);
      if (!response.ok) throw new Error('Failed to fetch yearly analytics');
      return response.json();
    }
  });

  // Fetch decade analysis
  const { data: decadeData = [], isLoading: decadeLoading } = useQuery({
    queryKey: ['/api/crm/analytics/decades'],
    queryFn: async () => {
      const response = await fetch('/api/crm/analytics/decades');
      if (!response.ok) throw new Error('Failed to fetch decade analysis');
      return response.json();
    }
  });

  // Fetch geographic analysis
  const { data: geoData = [], isLoading: geoLoading } = useQuery({
    queryKey: ['/api/crm/analytics/geographic'],
    queryFn: async () => {
      const response = await fetch('/api/crm/analytics/geographic');
      if (!response.ok) throw new Error('Failed to fetch geographic analysis');
      return response.json();
    }
  });

  // Fetch technology trends
  const { data: techData = [], isLoading: techLoading } = useQuery({
    queryKey: ['/api/crm/analytics/technology-trends'],
    queryFn: async () => {
      const response = await fetch('/api/crm/analytics/technology-trends');
      if (!response.ok) throw new Error('Failed to fetch technology trends');
      return response.json();
    }
  });

  // Fetch service analytics
  const { data: serviceData = [], isLoading: serviceLoading } = useQuery({
    queryKey: ['/api/crm/analytics/service-trends'],
    queryFn: async () => {
      const response = await fetch('/api/crm/analytics/service-trends');
      if (!response.ok) throw new Error('Failed to fetch service trends');
      return response.json();
    }
  });

  // Calculate key metrics from real data
  const totalCustomers = yearlyData.reduce((sum: number, year: YearlyStats) => sum + year.customerCount, 0);
  const totalCapacity = yearlyData.reduce((sum: number, year: YearlyStats) => sum + year.totalSystemCapacity, 0);
  const totalRevenue = yearlyData.reduce((sum: number, year: YearlyStats) => sum + year.totalRevenue, 0);
  const activeCustomers = yearlyData.reduce((sum: number, year: YearlyStats) => sum + year.activeCustomers, 0);

  // Battery adoption trend
  const batteryTrend = techData.reduce((acc: any, item: TechnologyTrend) => {
    const existing = acc.find((x: any) => x.year === item.year);
    if (existing) {
      existing.batteryPercentage = Math.max(existing.batteryPercentage, item.batteryPercentage);
    } else {
      acc.push({ year: item.year, batteryPercentage: item.batteryPercentage });
    }
    return acc;
  }, []).sort((a: any, b: any) => a.year - b.year);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Advance Power of Redding Analytics
            </h1>
            <p className="text-blue-200 text-lg">
              25+ Years of Solar Excellence - Business Intelligence Dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="bg-white/10 text-white border-white/20">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        {yearlyLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="loading-skeleton-metrics">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-white/20" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-8 w-32 bg-white/20" />
                  <Skeleton className="h-3 w-40 bg-white/20" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-orange-100">
                Since 1999 • {activeCustomers} active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Zap className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalCapacity / 1000).toFixed(1)}MW</div>
              <p className="text-xs text-yellow-100">
                {totalCapacity.toLocaleString()} kW installed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-orange-100">
                Lifetime customer value
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-purple-500 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Years in Business</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date().getFullYear() - 1999}</div>
              <p className="text-xs text-blue-100">
                Founded by Greg Tomsik
              </p>
            </CardContent>
          </Card>
        </motion.div>
        )}

        {/* Analytics Tabs */}
        <Tabs defaultValue="yearly" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur">
            <TabsTrigger value="yearly" className="text-white">Yearly Trends</TabsTrigger>
            <TabsTrigger value="decades" className="text-white">Decades View</TabsTrigger>
            <TabsTrigger value="geographic" className="text-white">Geographic</TabsTrigger>
            <TabsTrigger value="technology" className="text-white">Technology</TabsTrigger>
            <TabsTrigger value="service" className="text-white">Service</TabsTrigger>
          </TabsList>

          {/* Yearly Analytics */}
          <TabsContent value="yearly" className="space-y-6">
            {yearlyLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="loading-skeleton-charts">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-white/10 backdrop-blur border-white/20">
                    <CardHeader className="space-y-2">
                      <Skeleton className="h-6 w-48 bg-white/20" />
                      <Skeleton className="h-4 w-64 bg-white/20" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-[300px] w-full bg-white/20" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Installations by Year</CardTitle>
                  <CardDescription className="text-blue-200">
                    Annual installation volume and system capacity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="totalInstallations" fill="#FF6B35" name="Installations" />
                      <Bar dataKey="totalSystemCapacity" fill="#F7931E" name="Capacity (kW)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Growth</CardTitle>
                  <CardDescription className="text-blue-200">
                    Annual revenue and customer growth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="totalRevenue" 
                        stroke="#00FF88" 
                        strokeWidth={3}
                        name="Revenue ($)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="customerCount" 
                        stroke="#FFD700" 
                        strokeWidth={3}
                        name="Customers"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
            )}
          </TabsContent>

          {/* Decades Analysis */}
          <TabsContent value="decades" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Business Growth by Decade</CardTitle>
                <CardDescription className="text-blue-200">
                  Customer acquisition and capacity installation by decade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={decadeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ decade, count }) => `${decade}: ${count}`}
                      >
                        {decadeData.map((entry: CustomersByDecade, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-4">
                    {decadeData.map((decade: CustomersByDecade, index: number) => (
                      <div key={decade.decade} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-white font-medium">{decade.decade}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{decade.count} customers</div>
                          <div className="text-blue-200 text-sm">{decade.totalCapacity.toFixed(0)} kW</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geographic Analysis */}
          <TabsContent value="geographic" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Shasta County Service Areas</CardTitle>
                <CardDescription className="text-blue-200">
                  Customer distribution and market penetration by zip code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {geoData.slice(0, 9).map((area: GeographicData) => (
                    <div key={area.zipCode} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-orange-500/20 text-orange-200 border-orange-500/30">
                          {area.zipCode}
                        </Badge>
                        <MapPin className="w-4 h-4 text-blue-300" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-white font-semibold">{area.customerCount} customers</div>
                        <div className="text-blue-200 text-sm">{area.totalCapacity.toFixed(0)} kW total</div>
                        <div className="text-orange-200 text-sm">
                          ${area.averageSystemCost.toLocaleString()} avg cost
                        </div>
                        <div className="text-gray-300 text-xs">
                          Last: {new Date(area.lastInstallation).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technology Trends */}
          <TabsContent value="technology" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Battery System Adoption</CardTitle>
                  <CardDescription className="text-blue-200">
                    Percentage of installations with battery systems over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={batteryTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="batteryPercentage" 
                        stroke="#00FF88" 
                        fill="url(#batteryGradient)"
                      />
                      <defs>
                        <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FF88" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">System Size Evolution</CardTitle>
                  <CardDescription className="text-blue-200">
                    Average system sizes installed over the years
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="averageSystemSize" 
                        stroke="#FFD700" 
                        strokeWidth={3}
                        name="Avg System Size (kW)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Service Analytics */}
          <TabsContent value="service" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Service & Maintenance Trends</CardTitle>
                <CardDescription className="text-blue-200">
                  Service call volume and customer maintenance patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="totalServiceCalls" fill="#FF6B35" name="Service Calls" />
                    <Bar dataKey="customersServiced" fill="#F7931E" name="Customers Serviced" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}