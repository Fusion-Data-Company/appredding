import { Link, useLocation } from "wouter";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  ListChecks, 
  Calendar, 
  Share2, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  section: string;
  adminOnly?: boolean;
}

export default function AdminSidebar() {
  const { sidebar, currentSection, setCurrentSection } = useAdminContext();
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      section: "dashboard"
    },
    {
      label: "Contacts",
      icon: <Users className="h-5 w-5" />,
      section: "contacts"
    },
    {
      label: "Companies",
      icon: <Building2 className="h-5 w-5" />,
      section: "companies"
    },
    {
      label: "Opportunities",
      icon: <Briefcase className="h-5 w-5" />,
      section: "opportunities"
    },
    {
      label: "Tasks",
      icon: <ListChecks className="h-5 w-5" />,
      section: "tasks"
    },
    {
      label: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      section: "calendar"
    },
    {
      label: "Social Media",
      icon: <Share2 className="h-5 w-5" />,
      section: "social-media"
    },
    {
      label: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      section: "analytics"
    },
    {
      label: "User Management",
      icon: <Users className="h-5 w-5" />,
      section: "users",
      adminOnly: true
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      section: "settings"
    }
  ];

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate("/");
  };

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out",
        sidebar.isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!sidebar.isCollapsed && (
          <Link href="/">
            <a className="font-bold text-xl text-primary">Praetorian CRM</a>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={sidebar.toggle}
          className={cn(
            "rounded-full",
            sidebar.isCollapsed && "mx-auto"
          )}
        >
          {sidebar.isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            // Skip admin-only items for non-admin users
            if (item.adminOnly && user?.userType !== "super_admin" && user?.userType !== "admin") {
              return null;
            }

            return (
              <li key={item.section}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={currentSection === item.section ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start font-normal h-11",
                          sidebar.isCollapsed ? "px-2" : "px-3"
                        )}
                        onClick={() => setCurrentSection(item.section as any)}
                      >
                        {item.icon}
                        {!sidebar.isCollapsed && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    {sidebar.isCollapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal h-11",
                  sidebar.isCollapsed ? "px-2" : "px-3"
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                {!sidebar.isCollapsed && (
                  <span className="ml-3">Logout</span>
                )}
              </Button>
            </TooltipTrigger>
            {sidebar.isCollapsed && (
              <TooltipContent side="right">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}