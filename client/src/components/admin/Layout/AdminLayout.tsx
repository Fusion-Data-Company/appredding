import { ReactNode } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { sidebar } = useAdminContext();

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <div 
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          sidebar.isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <AdminHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
        
        <footer className="py-3 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Praetorian Protective Coatings. All rights reserved.</p>
            <p>Version 1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
}