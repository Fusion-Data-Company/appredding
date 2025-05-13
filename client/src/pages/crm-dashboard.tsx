import React, { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Loader2 } from "lucide-react";

/**
 * This component redirects to the appropriate page based on the URL parameters
 * It maintains backward compatibility with any existing links to /crm-dashboard
 */
export default function CRMDashboard() {
  useEffect(() => {
    // Get the URL parameters to check for tab
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');

    // Redirect based on the tab parameter
    if (tab === 'inventory') {
      window.location.href = '/inventory';
    } else {
      // Default redirect to the main CRM dashboard
      window.location.href = '/crm';
    }
  }, []);

  // Show a loading state while redirecting
  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-2 text-gray-600">Redirecting to the appropriate dashboard...</p>
      </div>
    </MainLayout>
  );
}

