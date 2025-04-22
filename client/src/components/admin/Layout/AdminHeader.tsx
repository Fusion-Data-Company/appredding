import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GradientHeading } from "@/components/ui/gradient-heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

export default function AdminHeader() {
  const { user, logoutMutation } = useAuth();
  const { currentSection } = useAdminContext();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Get section title from currentSection
  const getSectionTitle = () => {
    return currentSection.charAt(0).toUpperCase() + currentSection.slice(1).replace("-", " ");
  };

  // Get initials for avatar
  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}` || user.username?.[0] || "U";
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <GradientHeading level={1} className="text-2xl mr-4">{getSectionTitle()}</GradientHeading>
          
          {/* Section specific actions */}
          <div className="hidden md:flex space-x-2">
            {(currentSection === "contacts" || 
              currentSection === "companies" || 
              currentSection === "opportunities" || 
              currentSection === "tasks") && (
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add New</span>
              </Button>
            )}
            
            {currentSection === "social-media" && (
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Create Post</span>
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Add Contact</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Add Task</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                <span>Complete Task</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="py-2">
                  <div>
                    <p className="font-medium">New task assigned</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Robert Yeager assigned you a new task
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      10 minutes ago
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                  <div>
                    <p className="font-medium">Meeting reminder</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Client meeting in 30 minutes
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      25 minutes ago
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                  <div>
                    <p className="font-medium">New contact added</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      John Smith added as a new contact
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      1 hour ago
                    </p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <Button variant="outline" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl || ""} alt={user?.username || "User"} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}