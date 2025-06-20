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
  Tag,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Replaced date-fns with native Date methods for performance

// Contact type definition
export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  mobilePhone: string | null;
  jobTitle: string | null;
  department: string | null;
  status: "lead" | "prospect" | "customer" | "inactive";
  companyId: number | null;
  companyName?: string;
  lastContactedDate: string | null;
  createdAt: string;
  updatedAt: string;
  source?: string;
  tags?: { id: number; name: string; color: string }[];
}

// Function to fetch contacts from the server
async function fetchContacts() {
  const response = await fetch('/api/contacts');
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
}

// Function to delete a contact
async function deleteContact(id: number) {
  const response = await fetch(`/api/contacts/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
  
  return true;
}

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
  const [activeTab, setActiveTab] = useState<string>("all");
  const queryClient = useQueryClient();
  
  // Fetch contacts from API
  const { data: contacts, isLoading, isError } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts
  });
  
  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      toast.success("Contact deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: () => {
      toast.error("Failed to delete contact");
    }
  });

  // Filter contacts based on search query and active tab
  const filteredContacts = contacts?.filter(contact => {
    const matchesSearch = 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    // Filter by status tab
    if (activeTab === "customers") return contact.status === "customer";
    if (activeTab === "leads") return contact.status === "lead";
    if (activeTab === "prospects") return contact.status === "prospect";
    
    // "all" tab or default
    return true;
  }) || [];
  
  // Format last contacted time to relative format (2 days ago, etc.)
  const getLastContactedTime = (lastContactedDate: string | null) => {
    if (!lastContactedDate) return "Never";
    try {
      const now = new Date();
      const lastContacted = new Date(lastContactedDate);
      const diffMs = now.getTime() - lastContacted.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'today';
      if (diffDays === 1) return 'yesterday';
      if (diffDays < 30) return `${diffDays} days ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    } catch (e) {
      return "Unknown";
    }
  };
  
  // Handle delete contact
  const handleDeleteContact = (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteMutation.mutate(id);
    }
  };
  
  // Get full name from first and last name
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };
  
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
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['contacts'] })} 
            size="sm" 
            variant="outline" 
            className="h-9"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
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
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading contacts...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading contacts. Please try again.</p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="mb-2 text-gray-500">No contacts found</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Contact
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead className="hidden md:table-cell">Company</TableHead>
                      <TableHead className="hidden lg:table-cell">Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Source</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contact.firstName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{getFullName(contact.firstName, contact.lastName)}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {contact.companyName || 'No company'}
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
                            {contact.phone && (
                              <div className="flex items-center text-sm mt-1">
                                <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.companyName || 'No company'}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.jobTitle || 'No title'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(contact.status)}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {contact.source && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                              {contact.source}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getLastContactedTime(contact.lastContactedDate)}</TableCell>
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
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteContact(contact.id)}
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
                  <span className="ml-2">Loading customer contacts...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading contacts. Please try again.</p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No customer contacts found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead className="hidden md:table-cell">Company</TableHead>
                      <TableHead className="hidden lg:table-cell">Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Source</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contact.firstName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{getFullName(contact.firstName, contact.lastName)}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {contact.companyName || 'No company'}
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
                            {contact.phone && (
                              <div className="flex items-center text-sm mt-1">
                                <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.companyName || 'No company'}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.jobTitle || 'No title'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(contact.status)}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {contact.source && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                              {contact.source}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getLastContactedTime(contact.lastContactedDate)}</TableCell>
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
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteContact(contact.id)}
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="m-0">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading lead contacts...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading contacts. Please try again.</p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No lead contacts found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead className="hidden md:table-cell">Company</TableHead>
                      <TableHead className="hidden lg:table-cell">Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Source</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contact.firstName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{getFullName(contact.firstName, contact.lastName)}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {contact.companyName || 'No company'}
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
                            {contact.phone && (
                              <div className="flex items-center text-sm mt-1">
                                <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.companyName || 'No company'}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.jobTitle || 'No title'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(contact.status)}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {contact.source && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                              {contact.source}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getLastContactedTime(contact.lastContactedDate)}</TableCell>
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
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteContact(contact.id)}
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
                  <span className="ml-2">Loading prospect contacts...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading contacts. Please try again.</p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No prospect contacts found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead className="hidden md:table-cell">Company</TableHead>
                      <TableHead className="hidden lg:table-cell">Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Source</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contact.firstName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{getFullName(contact.firstName, contact.lastName)}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {contact.companyName || 'No company'}
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
                            {contact.phone && (
                              <div className="flex items-center text-sm mt-1">
                                <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.companyName || 'No company'}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.jobTitle || 'No title'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(contact.status)}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {contact.source && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                              {contact.source}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getLastContactedTime(contact.lastContactedDate)}</TableCell>
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
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteContact(contact.id)}
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}