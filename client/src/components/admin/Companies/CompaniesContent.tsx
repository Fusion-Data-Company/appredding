import { useState } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent } from "@/components/ui/card";
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
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Download, 
  Filter, 
  RefreshCcw,
  Building2,
  Users,
  DollarSign,
  Tag,
  MapPin,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Company type definition
export interface Company {
  id: number;
  name: string;
  industry: string | null;
  website: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  description: string | null;
  logoUrl: string | null;
  annualRevenue: string | null;
  employeeCount: number | null;
  createdAt: string;
  updatedAt: string;
  
  // Derived fields from relations
  contactCount?: number;
  opportunityCount?: number;
  totalRevenue?: number;
  tags?: { id: number; name: string; color: string }[];
  lastActivityDate?: string;
}

// Function to fetch companies from the server
async function fetchCompanies() {
  const response = await fetch('/api/companies');
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  return response.json();
}

// Function to delete a company
async function deleteCompany(id: number) {
  const response = await fetch(`/api/companies/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete company');
  }
  
  return true;
}

const getTagColor = (tag: string) => {
  if (tag === "VIP Customer") return "bg-purple-100 text-purple-800 border-purple-300";
  if (tag === "Construction") return "bg-amber-100 text-amber-800 border-amber-300";
  if (tag === "Marina") return "bg-blue-100 text-blue-800 border-blue-300";
  if (tag === "Pool") return "bg-cyan-100 text-cyan-800 border-cyan-300";
  if (tag === "Fire Prevention") return "bg-red-100 text-red-800 border-red-300";
  if (tag === "Mobile Home") return "bg-green-100 text-green-800 border-orange-300";
  if (tag === "Government") return "bg-green-100 text-green-800 border-green-300";
  if (tag === "Recurring") return "bg-indigo-100 text-indigo-800 border-indigo-300";
  if (tag === "New Client") return "bg-pink-100 text-pink-800 border-pink-300";
  if (tag === "Prospect") return "bg-yellow-100 text-yellow-800 border-yellow-300";
  return "bg-gray-100 text-gray-800 border-gray-300";
};

export default function CompaniesContent() {
  const { refreshData } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const queryClient = useQueryClient();
  
  // Fetch companies from API
  const { data: companies, isLoading, isError } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies
  });
  
  // Delete company mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      toast.success("Company deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: () => {
      toast.error("Failed to delete company");
    }
  });

  // Filter companies based on search query
  const filteredCompanies = companies?.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${company.city || ''} ${company.state || ''}`.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    // Filter by tab (in a real implementation, we'd filter by status or category)
    if (activeTab === "customers") {
      // For now, we'll consider all companies with opportunities as customers
      return company.opportunityCount && company.opportunityCount > 0;
    }
    if (activeTab === "prospects") {
      // Companies with contacts but no opportunities
      return (company.contactCount && company.contactCount > 0) && 
             (!company.opportunityCount || company.opportunityCount === 0);
    }
    if (activeTab === "inactive") {
      // Companies with no recent activity (using a placeholder approach)
      return false;
    }
    
    // "all" tab or default
    return true;
  }) || [];
  
  // Format location from address components
  const getLocation = (company: Company) => {
    if (company.city && company.state) {
      return `${company.city}, ${company.state}`;
    } else if (company.city) {
      return company.city;
    } else if (company.state) {
      return company.state;
    } else {
      return "No location";
    }
  };
  
  // Format revenue value
  const formatRevenue = (revenue: string | number | null | undefined) => {
    if (!revenue) return "$0";
    if (typeof revenue === 'number') {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0 
      }).format(revenue);
    }
    return revenue;
  };
  
  // Format last activity time to relative format
  const getLastActivityTime = (lastActivityDate: string | undefined) => {
    if (!lastActivityDate) return "Never";
    try {
      return formatDistanceToNow(new Date(lastActivityDate), { addSuffix: true });
    } catch (e) {
      return "Unknown";
    }
  };
  
  // Handle delete company
  const handleDeleteCompany = (id: number) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteMutation.mutate(id);
    }
  };
  
  // Get default tags for companies without tags
  const getDefaultTags = (company: Company) => {
    const industry = company.industry;
    if (!industry) return [];
    
    // Generate a tag based on the industry
    return [industry];
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Companies</h2>
          <p className="text-muted-foreground">
            Manage your business clients
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['companies'] })} 
            size="sm" 
            variant="outline" 
            className="h-9"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All Companies</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm">Customers</TabsTrigger>
            <TabsTrigger value="prospects" className="text-xs sm:text-sm">Prospects</TabsTrigger>
            <TabsTrigger value="inactive" className="text-xs sm:text-sm">Inactive</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search companies..."
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
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading companies...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading companies. Please try again.</p>
                </div>
              ) : filteredCompanies.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="mb-2 text-gray-500">No companies found</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Company
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead className="hidden md:table-cell">Industry</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead className="hidden md:table-cell">Contacts</TableHead>
                      <TableHead>Deals</TableHead>
                      <TableHead className="hidden md:table-cell">Revenue</TableHead>
                      <TableHead className="hidden lg:table-cell">Tags</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => {
                      const companyTags = company.tags || getDefaultTags(company);
                      return (
                        <TableRow key={company.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{company.name}</p>
                                <p className="text-xs text-muted-foreground md:hidden">
                                  {company.industry || 'No industry'}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{company.industry || 'No industry'}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {getLocation(company)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {company.contactCount || 0}
                            </div>
                          </TableCell>
                          <TableCell>{company.opportunityCount || 0}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {formatRevenue(company.annualRevenue || company.totalRevenue)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {companyTags.map((tag, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className={`${getTagColor(typeof tag === 'string' ? tag : tag.name)} flex items-center`}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {typeof tag === 'string' ? tag : tag.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{getLastActivityTime(company.lastActivityDate || company.updatedAt)}</TableCell>
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
                                <DropdownMenuItem>Edit Company</DropdownMenuItem>
                                <DropdownMenuItem>Add Contact</DropdownMenuItem>
                                <DropdownMenuItem>Add Opportunity</DropdownMenuItem>
                                <DropdownMenuItem>View Contacts</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteCompany(company.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="m-0">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading customer companies...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading companies. Please try again.</p>
                </div>
              ) : filteredCompanies.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No customer companies found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead className="hidden md:table-cell">Industry</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead className="hidden md:table-cell">Contacts</TableHead>
                      <TableHead>Deals</TableHead>
                      <TableHead className="hidden md:table-cell">Revenue</TableHead>
                      <TableHead className="hidden lg:table-cell">Tags</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => {
                      const companyTags = company.tags || getDefaultTags(company);
                      return (
                        <TableRow key={company.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{company.name}</p>
                                <p className="text-xs text-muted-foreground md:hidden">
                                  {company.industry || 'No industry'}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{company.industry || 'No industry'}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {getLocation(company)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {company.contactCount || 0}
                            </div>
                          </TableCell>
                          <TableCell>{company.opportunityCount || 0}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {formatRevenue(company.annualRevenue || company.totalRevenue)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {companyTags.map((tag, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className={`${getTagColor(typeof tag === 'string' ? tag : tag.name)} flex items-center`}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {typeof tag === 'string' ? tag : tag.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{getLastActivityTime(company.lastActivityDate || company.updatedAt)}</TableCell>
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
                                <DropdownMenuItem>Edit Company</DropdownMenuItem>
                                <DropdownMenuItem>Add Contact</DropdownMenuItem>
                                <DropdownMenuItem>Add Opportunity</DropdownMenuItem>
                                <DropdownMenuItem>View Contacts</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteCompany(company.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects" className="m-0">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading prospect companies...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading companies. Please try again.</p>
                </div>
              ) : filteredCompanies.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No prospect companies found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead className="hidden md:table-cell">Industry</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead className="hidden md:table-cell">Contacts</TableHead>
                      <TableHead>Deals</TableHead>
                      <TableHead className="hidden md:table-cell">Revenue</TableHead>
                      <TableHead className="hidden lg:table-cell">Tags</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => {
                      const companyTags = company.tags || getDefaultTags(company);
                      return (
                        <TableRow key={company.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{company.name}</p>
                                <p className="text-xs text-muted-foreground md:hidden">
                                  {company.industry || 'No industry'}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{company.industry || 'No industry'}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {getLocation(company)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {company.contactCount || 0}
                            </div>
                          </TableCell>
                          <TableCell>{company.opportunityCount || 0}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {formatRevenue(company.annualRevenue || company.totalRevenue)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {companyTags.map((tag, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className={`${getTagColor(typeof tag === 'string' ? tag : tag.name)} flex items-center`}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {typeof tag === 'string' ? tag : tag.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{getLastActivityTime(company.lastActivityDate || company.updatedAt)}</TableCell>
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
                                <DropdownMenuItem>Edit Company</DropdownMenuItem>
                                <DropdownMenuItem>Add Contact</DropdownMenuItem>
                                <DropdownMenuItem>Add Opportunity</DropdownMenuItem>
                                <DropdownMenuItem>View Contacts</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteCompany(company.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="m-0">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading inactive companies...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No inactive companies found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Companies without recent activity will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}