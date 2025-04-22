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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Filter, 
  RefreshCcw,
  Calendar,
  Clock,
  User,
  Building2,
  Tag
} from "lucide-react";

// Placeholder data
const tasksData = [
  {
    id: 1,
    title: "Follow up with John Smith",
    description: "Construction project estimate",
    dueDate: "Apr 22, 2025",
    priority: "high",
    status: "overdue",
    assignedTo: "You",
    relatedTo: {
      type: "contact",
      name: "John Smith",
      company: "ABC Construction"
    }
  },
  {
    id: 2,
    title: "Send quote to Marina project",
    description: "Protective coatings for docks",
    dueDate: "Apr 25, 2025",
    priority: "medium",
    status: "pending",
    assignedTo: "Robert Yeager",
    relatedTo: {
      type: "company",
      name: "Coastal Marinas LLC"
    }
  },
  {
    id: 3,
    title: "Schedule meeting with painters",
    description: "Pool coating training session",
    dueDate: "Apr 27, 2025",
    priority: "medium",
    status: "pending",
    assignedTo: "You",
    relatedTo: {
      type: "opportunity",
      name: "Pool Coating Project",
      company: "City Recreation Department"
    }
  },
  {
    id: 4,
    title: "Prepare fire prevention presentation",
    description: "For Regional Fire Prevention proposal",
    dueDate: "Apr 30, 2025",
    priority: "low",
    status: "in_progress",
    assignedTo: "Robert Yeager",
    relatedTo: {
      type: "opportunity",
      name: "Fire Retardant Application",
      company: "Regional Fire Prevention"
    }
  },
  {
    id: 5,
    title: "Call vendor for material pricing",
    description: "Update pricing for mobile home application",
    dueDate: "May 2, 2025",
    priority: "high",
    status: "in_progress",
    assignedTo: "You",
    relatedTo: {
      type: "contact",
      name: "David Miller",
      company: "Sunrise Mobile Estates"
    }
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "low":
      return "bg-green-100 text-green-800 border-green-300";
    case "urgent":
      return "bg-purple-100 text-purple-800 border-purple-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "in_progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "completed":
      return "bg-green-100 text-green-800 border-green-300";
    case "cancelled":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "overdue":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getRelatedIcon = (type: string) => {
  switch (type) {
    case "contact":
      return <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />;
    case "company":
      return <Building2 className="h-3.5 w-3.5 mr-1 text-muted-foreground" />;
    case "opportunity":
      return <Tag className="h-3.5 w-3.5 mr-1 text-muted-foreground" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
};

export default function TasksContent() {
  const { refreshData } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage your team's activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All Tasks</TabsTrigger>
            <TabsTrigger value="my_tasks" className="text-xs sm:text-sm">My Tasks</TabsTrigger>
            <TabsTrigger value="overdue" className="text-xs sm:text-sm">Overdue</TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search tasks..."
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
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead className="hidden md:table-cell">Related To</TableHead>
                    <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                    <TableHead className="hidden sm:table-cell">Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasksData.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Checkbox id={`task-${task.id}`} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          {getRelatedIcon(task.relatedTo.type)}
                          <div>
                            <p className="text-sm">{task.relatedTo.name}</p>
                            {task.relatedTo.company && (
                              <p className="text-xs text-muted-foreground">
                                {task.relatedTo.company}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {task.dueDate}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge 
                          variant="outline" 
                          className={`${getPriorityColor(task.priority)}`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(task.status)}`}
                        >
                          {getStatusText(task.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {task.assignedTo}
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
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                            <DropdownMenuItem>Add Reminder</DropdownMenuItem>
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

        <TabsContent value="my_tasks" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: My Tasks</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only your assigned tasks.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Overdue</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only overdue tasks.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-muted-foreground">Filter applied: Completed</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder. The actual filter would show only completed tasks.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}