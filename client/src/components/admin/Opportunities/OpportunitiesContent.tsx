import { useState } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Download, 
  Filter, 
  RefreshCcw,
  Calendar,
  DollarSign,
  Building2,
  User,
  Tag,
  PanelsTopLeft,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { format } from "date-fns";

// Opportunity type definition from schema
export interface Opportunity {
  id: number;
  name: string;
  contactId: number | null;
  companyId: number | null;
  applicationTypes: string[] | null;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  amount: string | null;
  probability: number | null;
  expectedCloseDate: string | null;
  actualCloseDate: string | null;
  description: string | null;
  source: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  assignedTo: number | null;
  
  // Joined fields through relations
  contact?: { 
    id: number;
    firstName: string;
    lastName: string;
  };
  company?: { 
    id: number;
    name: string;
  };
  assignedToUser?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  createdByUser?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

// Function to fetch opportunities
async function fetchOpportunities(status?: string) {
  const url = status && status !== 'all' ? `/api/opportunities?status=${status}` : '/api/opportunities';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }
  return response.json();
}

// Function to delete an opportunity
async function deleteOpportunity(id: number) {
  const response = await fetch(`/api/opportunities/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete opportunity');
  }
  
  return true;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "completed":
      return "bg-green-100 text-green-800 border-green-300";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
};

const getApplicationColor = (application: string) => {
  if (application === "Pool") return "bg-cyan-100 text-cyan-800 border-cyan-300";
  if (application === "Marina") return "bg-blue-100 text-blue-800 border-blue-300";
  if (application === "Fire Prevention") return "bg-red-100 text-red-800 border-red-300";
  if (application === "Construction") return "bg-amber-100 text-amber-800 border-amber-300";
  if (application === "Mobile Home") return "bg-orange-100 text-orange-800 border-orange-300";
  if (application === "Municipality") return "bg-green-100 text-green-800 border-green-300";
  return "bg-gray-100 text-gray-800 border-gray-300";
};

const getProgressColor = (probability: number) => {
  if (probability <= 25) return "bg-red-600";
  if (probability <= 50) return "bg-yellow-600";
  if (probability <= 75) return "bg-blue-600";
  return "bg-green-600";
};

// Format amount value
const formatAmount = (amount: string | null | undefined) => {
  if (!amount) return "$0";
  if (typeof amount === 'string' && amount.startsWith('$')) {
    return amount;
  }
  try {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(numAmount);
  } catch (e) {
    return amount || "$0";
  }
};

// Format date to readable format
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'No date set';
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch (e) {
    return dateString;
  }
};

// Get application type for display
const getApplicationType = (opportunity: Opportunity) => {
  if (opportunity.applicationTypes && opportunity.applicationTypes.length > 0) {
    return opportunity.applicationTypes[0];
  }
  return "General";
};

export default function OpportunitiesContent() {
  const { refreshData } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"table" | "kanban">("table");
  const [activeTab, setActiveTab] = useState<string>("all");
  const queryClient = useQueryClient();
  
  // Fetch opportunities from API, filtering by status if set
  const { data: opportunities, isLoading, isError } = useQuery({
    queryKey: ['opportunities', activeTab],
    queryFn: () => fetchOpportunities(activeTab !== 'all' ? activeTab : undefined)
  });
  
  // Filter opportunities based on search query
  // Delete opportunity mutation
  const deleteMutation = useMutation({
    mutationFn: deleteOpportunity,
    onSuccess: () => {
      toast.success("Opportunity deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
    onError: () => {
      toast.error("Failed to delete opportunity");
    }
  });
  
  // Filter opportunities based on search query
  const filteredOpportunities = opportunities?.filter(opportunity => {
    if (!searchQuery) return true;
    
    const companyName = opportunity.company?.name || '';
    const contactName = opportunity.contact 
      ? `${opportunity.contact.firstName || ''} ${opportunity.contact.lastName || ''}`.trim()
      : '';
      
    return opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           contactName.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];
  
  // Handle delete opportunity
  const handleDeleteOpportunity = (id: number) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      deleteMutation.mutate(id);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Opportunities</h2>
          <p className="text-muted-foreground">
            Manage your sales pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Opportunity
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex justify-between w-full">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All Deals</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
              <TabsTrigger value="in_progress" className="text-xs sm:text-sm">In Progress</TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant={view === "table" ? "default" : "outline"} 
                className="h-9 w-9 p-0"
                onClick={() => setView("table")}
              >
                <PanelsTopLeft className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant={view === "kanban" ? "default" : "outline"} 
                className="h-9 w-9 p-0"
                onClick={() => setView("kanban")}
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search deals..."
                className="pl-8 h-9 w-[200px] lg:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          {view === "table" ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opportunity</TableHead>
                      <TableHead className="hidden lg:table-cell">Company</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead className="hidden sm:table-cell">Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Probability</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Application</TableHead>
                      <TableHead className="hidden md:table-cell">Close Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOpportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{opportunity.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {opportunity.company?.name || 'No company'}
                            </p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {formatAmount(opportunity.amount)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center">
                            <Building2 className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {opportunity.company?.name || 'No company'}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {opportunity.contact ? 
                              `${opportunity.contact.firstName || ''} ${opportunity.contact.lastName || ''}`.trim() : 
                              'No contact'
                            }
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center">
                            <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {formatAmount(opportunity.amount)}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{opportunity.probability}%</span>
                            </div>
                            <Progress 
                              value={opportunity.probability} 
                              className={`h-2 ${getProgressColor(opportunity.probability)}`}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(opportunity.status)}`}
                          >
                            {getStatusText(opportunity.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge 
                            variant="outline" 
                            className={`${getApplicationColor(getApplicationType(opportunity))}`}
                          >
                            {getApplicationType(opportunity)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {formatDate(opportunity.expectedCloseDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Opportunity</DropdownMenuItem>
                              <DropdownMenuItem>Change Stage</DropdownMenuItem>
                              <DropdownMenuItem>Add Task</DropdownMenuItem>
                              <DropdownMenuItem>Add Note</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteOpportunity(opportunity.id)}
                                disabled={deleteMutation.isPending}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Kanban Board - Simplified Version */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Qualified Lead</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <p className="font-medium">Fire Retardant Application</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                        Fire Prevention
                      </Badge>
                      <p className="text-sm font-medium">$32,000</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Regional Fire Prevention
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Negotiation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <p className="font-medium">Marina Dock Restoration</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                        Marina
                      </Badge>
                      <p className="text-sm font-medium">$45,000</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Coastal Marinas LLC
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Contract</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <p className="font-medium">Building Waterproofing Project</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                        Construction
                      </Badge>
                      <p className="text-sm font-medium">$125,000</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      ABC Construction
                    </p>
                  </div>
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <p className="font-medium">Pool Coating Project</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="bg-cyan-100 text-cyan-800 border-cyan-300">
                        Pool
                      </Badge>
                      <p className="text-sm font-medium">$78,500</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      City Recreation Department
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Closed Won</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <p className="font-medium">Mobile Home Community Coating</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                        Mobile Home
                      </Badge>
                      <p className="text-sm font-medium">$65,000</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Sunrise Mobile Estates
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="m-0">
          {view === "table" ? (
            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  </div>
                ) : filteredOpportunities.filter(opp => opp.status === 'pending').length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="mb-2 text-gray-500">No pending opportunities found</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Opportunity</TableHead>
                        <TableHead className="hidden lg:table-cell">Company</TableHead>
                        <TableHead className="hidden md:table-cell">Contact</TableHead>
                        <TableHead className="hidden sm:table-cell">Amount</TableHead>
                        <TableHead className="hidden md:table-cell">Probability</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOpportunities.filter(opp => opp.status === 'pending').map((opportunity) => (
                        <TableRow key={opportunity.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{opportunity.name}</p>
                              <p className="text-xs text-muted-foreground">{opportunity.description}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {opportunity.company?.name || 'No company'}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {opportunity.contact ? 
                              `${opportunity.contact.firstName} ${opportunity.contact.lastName}` : 
                              'No contact'
                            }
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {formatAmount(opportunity.amount)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {opportunity.probability}%
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(opportunity.status)}>
                              {getStatusText(opportunity.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteOpportunity(opportunity.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="in_progress" className="m-0">
          {view === "table" ? (
            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  </div>
                ) : filteredOpportunities.filter(opp => opp.status === 'in_progress').length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="mb-2 text-gray-500">No in-progress opportunities found</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Opportunity</TableHead>
                        <TableHead className="hidden lg:table-cell">Company</TableHead>
                        <TableHead className="hidden md:table-cell">Contact</TableHead>
                        <TableHead className="hidden sm:table-cell">Amount</TableHead>
                        <TableHead className="hidden md:table-cell">Probability</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOpportunities.filter(opp => opp.status === 'in_progress').map((opportunity) => (
                        <TableRow key={opportunity.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{opportunity.name}</p>
                              <p className="text-xs text-muted-foreground">{opportunity.description}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {opportunity.company?.name || 'No company'}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {opportunity.contact ? 
                              `${opportunity.contact.firstName} ${opportunity.contact.lastName}` : 
                              'No contact'
                            }
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {formatAmount(opportunity.amount)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {opportunity.probability}%
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(opportunity.status)}>
                              {getStatusText(opportunity.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteOpportunity(opportunity.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Completed</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only completed opportunities.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}