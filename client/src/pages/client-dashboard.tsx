import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Project } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, FileText, MessageSquare, ClipboardList } from "lucide-react";

export default function ClientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");

  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  if (!user) {
    return null; // This shouldn't happen due to ProtectedRoute
  }

  // Format status for display
  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-900/20 text-yellow-500 border-yellow-800">Pending</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-900/20 text-blue-500 border-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-900/20 text-green-500 border-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-900/20 text-red-500 border-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Format date for display
  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "Not set";
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-950">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Client Dashboard</h1>
            <p className="text-gray-400">
              Welcome back, {user.firstName} {user.lastName}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project Request
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto">
            <TabsTrigger value="projects" className="py-3">
              <ClipboardList className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="profile" className="py-3">
              <FileText className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="messages" className="py-3">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Projects</h2>
                
                <select 
                  className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2 text-sm"
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="all">All Projects</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              {isLoadingProjects ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                </div>
              ) : projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="bg-primary-800 border-primary-700">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{project.name}</CardTitle>
                          {formatStatus(project.status)}
                        </div>
                        <CardDescription>ID: #{project.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Location:</span>
                            <span>{project.location || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Start Date:</span>
                            <span>{project.startDate ? formatDate(project.startDate) : "Not set"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Completion:</span>
                            <span>{project.completionDate ? formatDate(project.completionDate) : "Not set"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Budget:</span>
                            <span>{project.budget || "Not specified"}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-primary-800/50 rounded-lg border border-dashed border-primary-700">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-800 mb-4">
                    <ClipboardList className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Projects Found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    You don't have any projects yet. Start by creating a new project request or contact our team.
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project Request
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
              <h2 className="text-xl font-semibold mb-6">Your Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">First Name</label>
                        <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                          {user.firstName}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                        <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                          {user.lastName}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                        {user.email}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Phone</label>
                      <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                        {user.phone || "Not provided"}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Company</label>
                      <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                        {user.companyName || "Not provided"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline">
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Address Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Street Address</label>
                      <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                        {user.address || "Not provided"}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">City</label>
                        <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                          {user.city || "Not provided"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">State</label>
                        <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                          {user.state || "Not provided"}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Zip Code</label>
                      <div className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2">
                        {user.zipCode || "Not provided"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
              <h2 className="text-xl font-semibold mb-6">Messages</h2>
              
              <div className="text-center py-12 bg-primary-800/50 rounded-lg border border-dashed border-primary-700">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-800 mb-4">
                  <MessageSquare className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Messages Yet</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  You don't have any messages in your inbox. Messages related to your projects will appear here.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}