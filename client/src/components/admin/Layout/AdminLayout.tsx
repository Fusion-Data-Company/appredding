import { ReactNode } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { cn } from "@/lib/utils";

// This is a temporary solution until we implement the full components
const AdminSidebar = () => (
  <aside className="fixed inset-y-0 left-0 z-20 flex flex-col bg-white dark:bg-gray-800 shadow-md w-64">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="font-bold text-xl text-primary">Praetorian CRM</h1>
    </div>
    <nav className="flex-1 p-4">
      <p className="text-sm text-muted-foreground">Navigation sidebar placeholder</p>
    </nav>
  </aside>
);

const AdminHeader = () => (
  <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between p-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <p className="text-sm text-muted-foreground">Header placeholder</p>
    </div>
  </header>
);

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