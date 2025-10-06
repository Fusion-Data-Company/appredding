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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Filter, 
  RefreshCcw,
  Mail,
  Phone,
  Calendar,
  Shield,
  Lock,
  Key
} from "lucide-react";

// Mock user data
const usersData = [
  {
    id: 1,
    name: "Robert Yeager",
    email: "robert@praetoriancoatings.com",
    phone: "(555) 123-4567",
    role: "super_admin",
    status: "active",
    lastLogin: "Today at 9:45 AM",
    dateCreated: "Jan 15, 2023"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@praetoriancoatings.com",
    phone: "(555) 987-6543",
    role: "admin",
    status: "active",
    lastLogin: "Yesterday at 3:30 PM",
    dateCreated: "Mar 10, 2023"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@praetoriancoatings.com",
    phone: "(555) 456-7890",
    role: "sales",
    status: "active",
    lastLogin: "Apr 20, 2023 at 11:15 AM",
    dateCreated: "Jun 5, 2023"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@praetoriancoatings.com",
    phone: "(555) 234-5678",
    role: "sales",
    status: "inactive",
    lastLogin: "Apr 10, 2023 at 2:20 PM",
    dateCreated: "Aug 22, 2023"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@praetoriancoatings.com",
    phone: "(555) 876-5432",
    role: "admin",
    status: "active",
    lastLogin: "Today at 8:00 AM",
    dateCreated: "Oct 15, 2023"
  }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "super_admin":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "admin":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "sales":
      return "bg-green-100 text-green-800 border-green-300";
    case "client":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "painter":
      return "bg-green-100 text-green-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getRoleText = (role: string) => {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "admin":
      return "Admin";
    case "sales":
      return "Sales";
    case "client":
      return "Client";
    case "painter":
      return "Painter";
    default:
      return role;
  }
};

export default function UsersContent() {
  const { refreshData } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All Users</TabsTrigger>
            <TabsTrigger value="admin" className="text-xs sm:text-sm">Admins</TabsTrigger>
            <TabsTrigger value="sales" className="text-xs sm:text-sm">Sales Team</TabsTrigger>
            <TabsTrigger value="inactive" className="text-xs sm:text-sm">Inactive</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 h-9 w-[200px] lg:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${getRoleColor(user.role)}`}
                        >
                          {getRoleText(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {user.lastLogin}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center space-x-2">
                          <Switch checked={user.status === 'active'} />
                          <span className="text-sm capitalize">{user.status}</span>
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
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="h-4 w-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="h-4 w-4 mr-2" />
                              {user.status === 'active' ? 'Deactivate' : 'Activate'} Account
                            </DropdownMenuItem>
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

        <TabsContent value="admin" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Admins</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only admin users.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Sales Team</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only sales team users.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Inactive</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only inactive users.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Permissions Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Roles and Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getRoleColor("super_admin")}
                    >
                      Super Admin
                    </Badge>
                  </TableCell>
                  <TableCell>Full access to all system features and settings.</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getRoleColor("admin")}
                    >
                      Admin
                    </Badge>
                  </TableCell>
                  <TableCell>Administrative access with limited settings management.</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getRoleColor("sales")}
                    >
                      Sales
                    </Badge>
                  </TableCell>
                  <TableCell>Access to CRM, contacts, and sales-related functions.</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getRoleColor("client")}
                    >
                      Client
                    </Badge>
                  </TableCell>
                  <TableCell>Limited access to client dashboard and projects.</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getRoleColor("painter")}
                    >
                      Painter
                    </Badge>
                  </TableCell>
                  <TableCell>Access to painter network features and resources.</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}