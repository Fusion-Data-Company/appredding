import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { Suspense } from "react";
import { SuspenseFallback } from "@/components/ui/enhanced-loading";

type ProtectedRouteProps = {
  component: React.ComponentType<any>;
  path: string;
  adminOnly?: boolean;
};

export function ProtectedRoute({
  component: Component,
  path,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {(params) => {
        // Show loading spinner while checking authentication status
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          );
        }

        // If user is not authenticated, redirect to login
        if (!user) {
          return <Redirect to="/auth" />;
        }

        // If route is admin-only and user is not an admin, show access denied
        if (adminOnly && user.userType !== "admin") {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
              <p className="text-gray-300 mb-6">
                You don't have permission to access this page. This area is reserved for administrators.
              </p>
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>
          );
        }

        // If authenticated and authorized, render the component with Suspense for lazy loading
        return (
          <Suspense fallback={<SuspenseFallback message="Loading..." operationName="protected-route" />}>
            <Component {...params} />
          </Suspense>
        );
      }}
    </Route>
  );
}