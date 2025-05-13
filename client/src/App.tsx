import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense } from "react";
import { preloadCriticalImages } from "@/utils/image-preloader";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CRM from "@/pages/CRM";
import PainterNetwork from "@/pages/PainterNetwork";
import Marinas from "@/pages/Marinas";
import FirePrevention from "@/pages/FirePrevention";
import Pools from "@/pages/Pools";
const Construction = lazy(() => import('./pages/Construction'));
import MobileHome from "@/pages/MobileHome";
import Municipality from "@/pages/Municipality";
const Applications = lazy(() => import('./pages/Applications')); 
import ProductComparison from "@/pages/ProductComparison";
const Products = lazy(() => import('./pages/Products'));
const ROICalculator = lazy(() => import('./pages/ROICalculator'));
import Technology from "@/pages/Technology";
import AuthPage from "@/pages/auth-page";
import ClientDashboard from "@/pages/client-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
const About = lazy(() => import('./pages/About'));
import Team from "@/pages/Team";
import CrmLogin from "@/pages/crm-login";
import CrmDashboard from "@/pages/crm-dashboard";
import InventoryPage from "@/pages/inventory";
import RAGDocumentsPage from "@/pages/rag-documents";
import ChatPage from "@/pages/chat";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StoreProvider } from "@/contexts/StoreContext";

function Router() {
  const [location] = useLocation();

  // Preload images when routes change
  useEffect(() => {
    // Add a slight delay to ensure animation performance is prioritized
    const timer = setTimeout(() => {
      // This is a good place to prefetch images for the current route
      // For example, you could prefetch different images based on location
      if (location === '/') {
        // Home page already preloads critical images
      } else if (location.includes('/fire-prevention')) {
        // Preload fire prevention specific images
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/crm" component={CRM} />
      <Route path="/painter-network" component={PainterNetwork} />
      <Route path="/marinas" component={Marinas} />
      <Route path="/fire-prevention" component={FirePrevention} />
      <Route path="/pools" component={Pools} />
      <Route path="/construction" >
        <Suspense fallback={<div>Loading...</div>}>
          <Construction />
        </Suspense>
      </Route>
      <Route path="/mobile-home" component={MobileHome} />
      <Route path="/municipality" component={Municipality} />
      <Route path="/applications">
        <Suspense fallback={<div>Loading...</div>}>
          <Applications />
        </Suspense>
      </Route>
      <Route path="/products">
        <Suspense fallback={<div>Loading...</div>}>
          <Products />
        </Suspense>
      </Route>
      <Route path="/product-comparison" component={ProductComparison} />
      <Route path="/about">
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      </Route>
      <Route path="/team" component={Team} />
      <Route path="/technology">
        <Suspense fallback={<div>Loading...</div>}>
          <Technology />
        </Suspense>
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route path="/crm-login" component={CrmLogin} />
      <Route path="/crm-dashboard" component={CrmDashboard} />
      <Route path="/inventory" component={InventoryPage} />
      <Route path="/rag-documents" component={RAGDocumentsPage} />
      <Route path="/chat" component={ChatPage} />
      <ProtectedRoute path="/client-dashboard" component={ClientDashboard} />
      <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} adminOnly={true} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Preload critical images once when app loads
  useEffect(() => {
    // This triggers preloading of all critical site images
    preloadCriticalImages();

    // Force dark mode for both development and production
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#000';
    document.body.classList.add('dark');

    // Add performance monitoring
    if (typeof window !== 'undefined') {
      // Report largest contentful paint for performance monitoring
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && lastEntry.startTime > 0) {
          console.log(`Largest Contentful Paint: ${lastEntry.startTime}ms`);
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <StoreProvider>
            <Router />
          </StoreProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;