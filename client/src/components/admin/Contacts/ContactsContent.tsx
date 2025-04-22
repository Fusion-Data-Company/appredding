import { useState } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Download, 
  Filter, 
  RefreshCcw,
  Mail,
  Phone,
  Tag
} from "lucide-react";

// Placeholder data
const contactsData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    company: "ABC Construction",
    title: "Project Manager",
    status: "customer",
    tags: ["Construction", "VIP"],
    lastContact: "2 days ago"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@coastalmarinas.com",
    phone: "(555) 987-6543",
    company: "Coastal Marinas LLC",
    title: "Operations Director",
    status: "lead",
    tags: ["Marina", "Interested"],
    lastContact: "1 week ago"
  },
  {
    id: 3,
    name: "Michael Williams",
    email: "m.williams@citypool.gov",
    phone: "(555) 456-7890",
    company: "City Recreation Dept",
    title: "Facilities Manager",
    status: "customer",
    tags: ["Pool", "Government"],
    lastContact: "3 days ago"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@firesafety.org",
    phone: "(555) 234-5678",
    company: "Regional Fire Prevention",
    title: "Safety Officer",
    status: "prospect",
    tags: ["Fire Prevention"],
    lastContact: "Just now"
  },
  {
    id: 5,
    name: "David Miller",
    email: "dmiller@mobileestates.com",
    phone: "(555) 876-5432",
    company: "Sunrise Mobile Estates",
    title: "Property Manager",
    status: "customer",
    tags: ["Mobile Home", "Recurring"],
    lastContact: "Yesterday"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "lead":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "prospect":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "customer":
      return "bg-green-100 text-green-800 border-green-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getTagColor = (tag: string) => {
  if (tag === "VIP") return "bg-purple-100 text-purple-800 border-purple-300";
  if (tag === "Construction") return "bg-amber-100 text-amber-800 border-amber-300";
  if (tag === "Marina") return "bg-blue-100 text-blue-800 border-blue-300";
  if (tag === "Pool") return "bg-cyan-100 text-cyan-800 border-cyan-300";
  if (tag === "Fire Prevention") return "bg-red-100 text-red-800 border-red-300";
  if (tag === "Mobile Home") return "bg-orange-100 text-orange-800 border-orange-300";
  if (tag === "Government") return "bg-green-100 text-green-800 border-green-300";
  if (tag === "Recurring") return "bg-indigo-100 text-indigo-800 border-indigo-300";
  if (tag === "Interested") return "bg-pink-100 text-pink-800 border-pink-300";
  return "bg-gray-100 text-gray-800 border-gray-300";
};

export default function ContactsContent() {
  const { refreshData } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All Contacts</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm">Customers</TabsTrigger>
            <TabsTrigger value="leads" className="text-xs sm:text-sm">Leads</TabsTrigger>
            <TabsTrigger value="prospects" className="text-xs sm:text-sm">Prospects</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search contacts..."
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
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Company</TableHead>
                    <TableHead className="hidden lg:table-cell">Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Tags</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactsData.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {contact.company}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{contact.company}</TableCell>
                      <TableCell className="hidden lg:table-cell">{contact.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColor(contact.status)}`}>
                          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag, idx) => (
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
                      <TableCell>{contact.lastContact}</TableCell>
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
                            <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                            <DropdownMenuItem>Add Task</DropdownMenuItem>
                            <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
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
                This is a placeholder. The actual filter would show only customer contacts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Leads</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only lead contacts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Prospects</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only prospect contacts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}