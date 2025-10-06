import { useAuth } from "@/hooks/use-auth";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Building2, 
  Briefcase, 
  ListChecks,
  RefreshCcw
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboardContent() {
  const { user } = useAuth();
  const { refreshData } = useAdminContext();

  return (
    <div className="space-y-4">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.firstName || user?.username}!
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your CRM system
          </p>
        </div>
        <Button onClick={refreshData} size="sm" variant="outline" className="flex items-center gap-1">
          <RefreshCcw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+89</div>
            <p className="text-xs text-muted-foreground">
              +19.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks and recent activities */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Active deals pipeline */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>
              Active deals by stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">Qualified Lead</span>
                  </div>
                  <span className="text-sm font-medium">24 ($120,000)</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-yellow-500" />
                    <span className="text-sm font-medium">Proposal Sent</span>
                  </div>
                  <span className="text-sm font-medium">18 ($90,000)</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-orange-500" />
                    <span className="text-sm font-medium">Negotiation</span>
                  </div>
                  <span className="text-sm font-medium">16 ($80,000)</span>
                </div>
                <Progress value={16} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-red-500" />
                    <span className="text-sm font-medium">Closed Won</span>
                  </div>
                  <span className="text-sm font-medium">12 ($60,000)</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Outstanding Tasks</CardTitle>
              <CardDescription>
                Tasks requiring attention
              </CardDescription>
            </div>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Follow up with John Smith</p>
                    <p className="text-sm text-muted-foreground">Construction project estimate</p>
                  </div>
                  <div className="flex items-center justify-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Overdue
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due Apr 20, 2023</span>
                  <span>Assigned to you</span>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Send quote to Marina project</p>
                    <p className="text-sm text-muted-foreground">Protective coatings for docks</p>
                  </div>
                  <div className="flex items-center justify-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                    Today
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due Apr 22, 2023</span>
                  <span>Assigned to Robert</span>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Schedule meeting with painters</p>
                    <p className="text-sm text-muted-foreground">Pool coating training session</p>
                  </div>
                  <div className="flex items-center justify-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    This Week
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due Apr 25, 2023</span>
                  <span>Assigned to you</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Sales by Application Type Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales by Application Type</CardTitle>
            <CardDescription>
              Year to date distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[200px] flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-gray-300" />
              <span className="ml-2 text-gray-500">Chart data will appear here</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">New contact added</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson from Coastal Marinas LLC</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Deal closed</p>
                  <p className="text-xs text-muted-foreground">City Pool Renovations - $24,500</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                  <ListChecks className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Task completed</p>
                  <p className="text-xs text-muted-foreground">Product demo for fire prevention coatings</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}