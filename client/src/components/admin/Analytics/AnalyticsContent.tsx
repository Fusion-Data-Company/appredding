import { useState } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  RefreshCcw,
  DownloadCloud,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Building2,
  Briefcase
} from "lucide-react";

// Placeholder component for when we have real charts
const ChartPlaceholder = ({ title, height = 300 }: { title: string, height?: number }) => (
  <div 
    className="flex flex-col items-center justify-center bg-muted/20 rounded-md" 
    style={{ height: `${height}px` }}
  >
    <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
    <p className="text-sm text-muted-foreground">{title}</p>
  </div>
);

// Stat Card component
const StatCard = ({ 
  title, 
  value, 
  change, 
  icon,
  prefix = ""
}: { 
  title: string, 
  value: string | number, 
  change: number,
  icon: React.ReactNode,
  prefix?: string
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{prefix}{value}</h3>
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4">
        {change > 0 ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '+' : ''}{change}% from last month
        </span>
      </div>
    </CardContent>
  </Card>
);

export default function AnalyticsContent() {
  const { refreshData } = useAdminContext();
  const [dateRange, setDateRange] = useState("this_month");
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Monitor your business performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9" variant="outline">
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="sales" className="text-xs sm:text-sm">Sales</TabsTrigger>
              <TabsTrigger value="marketing" className="text-xs sm:text-sm">Marketing</TabsTrigger>
              <TabsTrigger value="customers" className="text-xs sm:text-sm">Customers</TabsTrigger>
            </TabsList>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Select Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="last_week">Last Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="this_quarter">This Quarter</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview" className="m-0 space-y-4">
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Total Revenue" 
                value="45,231.89" 
                change={20.1} 
                icon={<DollarSign className="h-6 w-6 text-primary" />}
                prefix="$"
              />
              <StatCard 
                title="New Contacts" 
                value="238" 
                change={5.3} 
                icon={<Users className="h-6 w-6 text-primary" />}
              />
              <StatCard 
                title="Opportunities" 
                value="38" 
                change={-2.5} 
                icon={<Briefcase className="h-6 w-6 text-primary" />}
              />
              <StatCard 
                title="Win Rate" 
                value="68%" 
                change={12.0} 
                icon={<TrendingUp className="h-6 w-6 text-primary" />}
              />
            </div>

            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Revenue Trend Chart" />
              </CardContent>
            </Card>

            {/* Pipeline and Sales by Product */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Pipeline</CardTitle>
                  <CardDescription>Opportunity stages by value</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder title="Pipeline Stage Chart" height={250} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Application Type</CardTitle>
                  <CardDescription>Revenue distribution by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder title="Sales by Application Chart" height={250} />
                </CardContent>
              </Card>
            </div>

            {/* Recent Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Sales Rep</CardTitle>
                <CardDescription>Sales team performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium">Robert Yeager</span>
                      </div>
                      <span className="text-sm font-medium">$24,500</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium">Sarah Johnson</span>
                      </div>
                      <span className="text-sm font-medium">$18,750</span>
                    </div>
                    <Progress value={63} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <span className="text-sm font-medium">Michael Brown</span>
                      </div>
                      <span className="text-sm font-medium">$12,300</span>
                    </div>
                    <Progress value={41} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-sm font-medium">Emily Davis</span>
                      </div>
                      <span className="text-sm font-medium">$9,680</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="m-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Detailed sales performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Sales Analytics</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This is a placeholder for the sales analytics dashboard.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="m-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Analytics</CardTitle>
                <CardDescription>Campaign performance and lead tracking</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Marketing Analytics</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This is a placeholder for the marketing analytics dashboard.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="m-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Customer insights and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Customer Analytics</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This is a placeholder for the customer analytics dashboard.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}