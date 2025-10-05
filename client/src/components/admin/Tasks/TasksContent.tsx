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
  Tag,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
import toast from "react-hot-toast";

// Task types
export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "cancelled" | "overdue";
  dueDate: string | null;
  completedDate: string | null;
  reminderDate: string | null;
  contactId: number | null;
  companyId: number | null;
  opportunityId: number | null;
  assignedBy: number;
  assignedTo: number;
  createdAt: string;
  updatedAt: string;
  assignedToName?: string;
  assignedByName?: string;
  contact?: { firstName: string; lastName: string; companyName?: string };
  company?: { name: string };
  opportunity?: { name: string; company?: { name: string } };
}

// Fetch and mutation functions
async function fetchTasks(status?: string) {
  const url = status ? `/api/tasks?status=${status}` : '/api/tasks';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
}

async function completeTask(id: number) {
  const response = await fetch(`/api/tasks/${id}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to complete task');
  }
  
  return response.json();
}

async function deleteTaskById(id: number) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  
  return response.json();
}

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
  const [activeTab, setActiveTab] = useState<string>("all");
  const queryClient = useQueryClient();
  
  // Fetch tasks based on the active tab
  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ['tasks', activeTab],
    queryFn: () => {
      if (activeTab === 'overdue') {
        return fetchTasks('overdue');
      } else if (activeTab === 'completed') {
        return fetchTasks('completed');
      } else {
        return fetchTasks();
      }
    }
  });
  
  // Complete task mutation
  const completeMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      toast.success('Task marked as completed');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      toast.error('Failed to complete task');
    }
  });
  
  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      toast.success('Task deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      toast.error('Failed to delete task');
    }
  });

  // Filter tasks based on search query
  const filteredTasks = tasks?.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  // Function to handle marking a task as complete
  const handleCompleteTask = (id: number) => {
    completeMutation.mutate(id);
  };
  
  // Function to handle deleting a task
  const handleDeleteTask = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Format date from ISO string
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  // Get related entity details
  const getRelatedInfo = (task: Task) => {
    if (task.contactId && task.contact) {
      return {
        type: 'contact',
        name: `${task.contact.firstName} ${task.contact.lastName}`,
        company: task.contact.companyName
      };
    } else if (task.companyId && task.company) {
      return {
        type: 'company',
        name: task.company.name
      };
    } else if (task.opportunityId && task.opportunity) {
      return {
        type: 'opportunity',
        name: task.opportunity.name,
        company: task.opportunity.company?.name
      };
    }
    
    return { type: 'none', name: 'Not related' };
  };
  
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
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['tasks'] })} 
            size="sm" 
            variant="outline" 
            className="h-9"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
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
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading tasks...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading the tasks. Please try again.</p>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="mb-2 text-gray-500">No tasks found</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Task
                  </Button>
                </div>
              ) : (
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
                    {filteredTasks.map((task) => {
                      const relatedInfo = getRelatedInfo(task);
                      return (
                        <TableRow key={task.id}>
                          <TableCell>
                            <Checkbox 
                              id={`task-${task.id}`} 
                              checked={task.status === 'completed'} 
                              onCheckedChange={
                                () => task.status !== 'completed' && handleCompleteTask(task.id)
                              } 
                              disabled={task.status === 'completed' || completeMutation.isPending}
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.description || "No description"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              {getRelatedIcon(relatedInfo.type)}
                              <div>
                                <p className="text-sm">{relatedInfo.name}</p>
                                {relatedInfo.company && (
                                  <p className="text-xs text-muted-foreground">
                                    {relatedInfo.company}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {formatDate(task.dueDate)}
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
                              {task.assignedToName || `User ${task.assignedTo}`}
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
                                <DropdownMenuItem 
                                  onClick={() => handleCompleteTask(task.id)}
                                  disabled={task.status === 'completed' || completeMutation.isPending}
                                >
                                  Mark Complete
                                </DropdownMenuItem>
                                <DropdownMenuItem>Reassign</DropdownMenuItem>
                                <DropdownMenuItem>Add Reminder</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteTask(task.id)}
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

        <TabsContent value="my_tasks" className="m-0">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading tasks...</span>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="mb-2 text-gray-500">No tasks assigned to you</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Task
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead className="hidden md:table-cell">Related To</TableHead>
                      <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                      <TableHead className="hidden sm:table-cell">Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => {
                      const relatedInfo = getRelatedInfo(task);
                      return (
                        <TableRow key={task.id}>
                          <TableCell>
                            <Checkbox 
                              id={`task-${task.id}`} 
                              checked={task.status === 'completed'} 
                              onCheckedChange={() => task.status !== 'completed' && handleCompleteTask(task.id)}
                              disabled={task.status === 'completed' || completeMutation.isPending}
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">{task.description || "No description"}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              {getRelatedIcon(relatedInfo.type)}
                              <div>
                                <p className="text-sm">{relatedInfo.name}</p>
                                {relatedInfo.company && (
                                  <p className="text-xs text-muted-foreground">{relatedInfo.company}</p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {formatDate(task.dueDate)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(task.status)}>
                              {getStatusText(task.status)}
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
                                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCompleteTask(task.id)}>
                                  Mark Complete
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteTask(task.id)}>
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

        <TabsContent value="overdue" className="m-0">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading overdue tasks...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading the tasks. Please try again.</p>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No overdue tasks found</p>
                </div>
              ) : (
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
                    {filteredTasks.map((task) => {
                      const relatedInfo = getRelatedInfo(task);
                      return (
                        <TableRow key={task.id}>
                          <TableCell>
                            <Checkbox 
                              id={`task-${task.id}`} 
                              checked={task.status === 'completed'} 
                              onCheckedChange={
                                () => task.status !== 'completed' && handleCompleteTask(task.id)
                              } 
                              disabled={task.status === 'completed' || completeMutation.isPending}
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.description || "No description"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              {getRelatedIcon(relatedInfo.type)}
                              <div>
                                <p className="text-sm">{relatedInfo.name}</p>
                                {relatedInfo.company && (
                                  <p className="text-xs text-muted-foreground">
                                    {relatedInfo.company}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {formatDate(task.dueDate)}
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
                              {task.assignedToName || `User ${task.assignedTo}`}
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
                                <DropdownMenuItem 
                                  onClick={() => handleCompleteTask(task.id)}
                                  disabled={task.status === 'completed' || completeMutation.isPending}
                                >
                                  Mark Complete
                                </DropdownMenuItem>
                                <DropdownMenuItem>Reassign</DropdownMenuItem>
                                <DropdownMenuItem>Add Reminder</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteTask(task.id)}
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

        <TabsContent value="completed" className="m-0">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
                  <span className="ml-2">Loading completed tasks...</span>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center p-8 text-center text-red-500">
                  <p>There was an error loading the tasks. Please try again.</p>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-500">No completed tasks found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead className="hidden md:table-cell">Related To</TableHead>
                      <TableHead className="hidden lg:table-cell">Completed Date</TableHead>
                      <TableHead className="hidden sm:table-cell">Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => {
                      const relatedInfo = getRelatedInfo(task);
                      return (
                        <TableRow key={task.id} className="opacity-80">
                          <TableCell>
                            <Checkbox 
                              id={`task-${task.id}`} 
                              checked={true} 
                              disabled={true}
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium line-through">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.description || "No description"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              {getRelatedIcon(relatedInfo.type)}
                              <div>
                                <p className="text-sm">{relatedInfo.name}</p>
                                {relatedInfo.company && (
                                  <p className="text-xs text-muted-foreground">
                                    {relatedInfo.company}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {formatDate(task.completedDate)}
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
                              {task.assignedToName || `User ${task.assignedTo}`}
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
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteTask(task.id)}
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
      </Tabs>
    </div>
  );
}