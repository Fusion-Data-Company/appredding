import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "wouter";

type AdminSections = 
  | 'dashboard' 
  | 'contacts' 
  | 'companies' 
  | 'opportunities' 
  | 'tasks' 
  | 'calendar' 
  | 'social-media' 
  | 'users' 
  | 'settings' 
  | 'analytics';

interface AdminContextType {
  currentSection: AdminSections;
  setCurrentSection: (section: AdminSections) => void;
  isLoading: boolean;
  sidebar: {
    isCollapsed: boolean;
    toggle: () => void;
  };
  theme: {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
  };
  dataRefreshTrigger: number;
  refreshData: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState<AdminSections>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [primaryColor, setPrimaryColor] = useState<string>('#3b82f6');
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState<number>(0);

  // Verify admin access
  useEffect(() => {
    if (user) {
      if (user.userType !== 'super_admin' && user.userType !== 'admin') {
        toast({
          title: "Access denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, toast, navigate]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  // Refresh data
  const refreshData = () => {
    setDataRefreshTrigger(prev => prev + 1);
  };

  const value = {
    currentSection,
    setCurrentSection,
    isLoading,
    sidebar: {
      isCollapsed: sidebarCollapsed,
      toggle: toggleSidebar,
    },
    theme: {
      primaryColor,
      setPrimaryColor,
    },
    dataRefreshTrigger,
    refreshData,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}