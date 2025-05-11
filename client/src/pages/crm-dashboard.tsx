import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, LogOut } from "lucide-react";

import { LoginForm } from "@/components/crm/LoginForm";
import { InventoryTable } from "@/components/crm/InventoryTable";
import { OrderForm } from "@/components/crm/OrderForm";
import { OrdersTable } from "@/components/crm/OrdersTable";
import { NotificationCenter } from "@/components/crm/NotificationCenter";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: number;
  email: string;
  role: string;
  notificationMode: string;
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [notificationMode, setNotificationMode] = useState<string>("in-app");
  
  // Query to get current user
  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
  } = useQuery<User>({
    queryKey: ["/api/crm/auth/me"],
    retry: false, // Don't retry if not authenticated
  });
  
  // Update notification mode in state when user is fetched
  useEffect(() => {
    if (user?.notificationMode) {
      setNotificationMode(user.notificationMode);
    }
  }, [user]);
  
  // Handle notification mode change
  const handleNotificationModeChange = async (mode: string) => {
    setNotificationMode(mode);
    
    try {
      const response = await apiRequest("POST", "/api/crm/auth/notification-mode", { mode });
      if (!response.ok) {
        throw new Error("Failed to update notification mode");
      }
    } catch (error) {
      console.error("Error updating notification mode:", error);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/crm/auth/logout", {});
      refetchUser(); // Refetch user to update authentication state
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // Not authenticated - show login form
  if (!user || error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Praetorian SmartCoat</h1>
          <p className="text-gray-300">Inventory Management CRM</p>
        </div>
        
        <LoginForm onLoginSuccess={refetchUser} />
      </div>
    );
  }
  
  // Authenticated - show dashboard
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">
                Praetorian SmartCoat CRM
              </h1>
              <Badge variant="outline" className="ml-2">
                {user.role}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Select 
                  value={notificationMode} 
                  onValueChange={handleNotificationModeChange}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Notification mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-app">In-app</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="console">Console (dev)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <NotificationCenter />
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Logged in as {user.email}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            {user.role === "admin" && (
              <TabsTrigger value="new-order">New Order</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="inventory" className="space-y-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold gradient-text-orange mb-1">Product Inventory</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Manage SmartCoat product stock levels and reorder supplies
                  </p>
                </div>
              </div>
              <InventoryTable isAdmin={user.role === "admin"} />
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-8">
            <OrdersTable 
              userId={user.id} 
              isAdmin={user.role === "admin"} 
            />
          </TabsContent>
          
          <TabsContent value="new-order" className="space-y-8">
            <OrderForm 
              userId={user.id} 
              onOrderPlaced={() => setActiveTab("orders")} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Missing Badge import
import { Badge } from "@/components/ui/badge";