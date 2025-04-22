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
  MapPin
} from "lucide-react";

// Placeholder data
const companiesData = [
  {
    id: 1,
    name: "ABC Construction",
    industry: "Construction",
    location: "Chicago, IL",
    contacts: 5,
    deals: 3,
    revenue: "$125,000",
    tags: ["Construction", "VIP Customer"],
    lastActivity: "2 days ago"
  },
  {
    id: 2,
    name: "Coastal Marinas LLC",
    industry: "Marine",
    location: "Miami, FL",
    contacts: 2,
    deals: 1,
    revenue: "$45,000",
    tags: ["Marina", "New Client"],
    lastActivity: "1 week ago"
  },
  {
    id: 3,
    name: "City Recreation Department",
    industry: "Government",
    location: "Denver, CO",
    contacts: 3,
    deals: 2,
    revenue: "$78,500",
    tags: ["Pool", "Government"],
    lastActivity: "3 days ago"
  },
  {
    id: 4,
    name: "Regional Fire Prevention",
    industry: "Safety",
    location: "Phoenix, AZ",
    contacts: 1,
    deals: 1,
    revenue: "$0",
    tags: ["Fire Prevention", "Prospect"],
    lastActivity: "Just now"
  },
  {
    id: 5,
    name: "Sunrise Mobile Estates",
    industry: "Real Estate",
    location: "Tampa, FL",
    contacts: 4,
    deals: 5,
    revenue: "$230,000",
    tags: ["Mobile Home", "Recurring"],
    lastActivity: "Yesterday"
  }
];

const getTagColor = (tag: string) => {
  if (tag === "VIP Customer") return "bg-purple-100 text-purple-800 border-purple-300";
  if (tag === "Construction") return "bg-amber-100 text-amber-800 border-amber-300";
  if (tag === "Marina") return "bg-blue-100 text-blue-800 border-blue-300";
  if (tag === "Pool") return "bg-cyan-100 text-cyan-800 border-cyan-300";
  if (tag === "Fire Prevention") return "bg-red-100 text-red-800 border-red-300";
  if (tag === "Mobile Home") return "bg-orange-100 text-orange-800 border-orange-300";
  if (tag === "Government") return "bg-green-100 text-green-800 border-green-300";
  if (tag === "Recurring") return "bg-indigo-100 text-indigo-800 border-indigo-300";
  if (tag === "New Client") return "bg-pink-100 text-pink-800 border-pink-300";
  if (tag === "Prospect") return "bg-yellow-100 text-yellow-800 border-yellow-300";
  return "bg-gray-100 text-gray-800 border-gray-300";
};

export default function CompaniesContent() {
  const { refreshData } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState("");
  
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
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
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
                  {companiesData.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{company.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {company.industry}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{company.industry}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {company.location}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {company.contacts}
                        </div>
                      </TableCell>
                      <TableCell>{company.deals}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {company.revenue}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {company.tags.map((tag, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className={`${getTagColor(tag)} flex items-center`}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{company.lastActivity}</TableCell>
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
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Customers</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only customer companies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Prospects</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only prospect companies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Inactive</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only inactive companies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}