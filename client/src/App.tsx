import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense } from "react";
import { preloadCriticalImages } from "@/utils/image-preloader";
import { errorHandler } from "@/utils/error-handler";
import { usePerformance } from "@/hooks/use-performance";
import { SuspenseFallback } from "@/components/ui/enhanced-loading";
import { PerformanceIndicator } from "@/components/ui/performance-indicator";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CRM from "@/pages/CRM";
// PainterNetwork page has been removed
import Marinas from "@/pages/Marinas";
import FirePrevention from "@/pages/FirePrevention";
import Painters from "@/pages/Painters";
import Pools from "@/pages/Pools";
import ResidentialSolar from "@/pages/ResidentialSolar";
import CommercialSolar from "@/pages/CommercialSolar";
import HybridSolar from "@/pages/HybridSolar";
import LithiumBattery from "@/pages/LithiumBattery";
import EnergyConservation from "@/pages/EnergyConservation";
import BatteryStorage from "@/pages/BatteryStorage";
import Maintenance from "@/pages/Maintenance";
import Repairs from "@/pages/Repairs";
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
import CRMDashboard from "@/pages/CRMDashboardFixed";
import EnterpriseCARM from "@/pages/EnterpriseCARM";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import InventoryPage from "@/pages/inventory";
import RAGDocumentsPage from "@/pages/rag-documents";
import ChatPage from "@/pages/chat";
import DocumentChatInterface from "@/pages/DocumentChatInterface";
import FinancialCenter from "@/pages/FinancialCenter";
import DataProcessingCenter from "@/pages/DataProcessingCenter";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StoreProvider } from "@/contexts/StoreContext";

function Router() {
  const [location] = useLocation();
  const { metrics, isGoodPerformance } = usePerformance();

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

  // Log route performance issues (reduced frequency)
  useEffect(() => {
    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 5000) {
      console.warn(`Very slow page load on ${location}: LCP ${Math.round(metrics.largestContentfulPaint)}ms`);
    }
  }, [location, metrics]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/crm" component={CRM} />
      {/* Remove painter-network route to avoid redirects */}
      <Route path="/marinas" component={Marinas} />
      <Route path="/fire-prevention" component={FirePrevention} />
      <Route path="/painters" component={Painters} />
      <Route path="/pools" component={Pools} />
      <Route path="/construction" >
        <Suspense fallback={<SuspenseFallback message="Loading Construction..." operationName="construction-page" />}>
          <Construction />
        </Suspense>
      </Route>
      <Route path="/mobile-home" component={MobileHome} />
      <Route path="/municipality" component={Municipality} />
      <Route path="/residential-solar" component={ResidentialSolar} />
      <Route path="/commercial-solar" component={CommercialSolar} />
      <Route path="/hybrid-solar" component={HybridSolar} />
      <Route path="/lithium-battery" component={LithiumBattery} />
      <Route path="/energy-conservation" component={EnergyConservation} />
      <Route path="/battery-storage" component={BatteryStorage} />
      <Route path="/maintenance" component={Maintenance} />
      <Route path="/repairs" component={Repairs} />
      <Route path="/applications">
        <Suspense fallback={<SuspenseFallback message="Loading Applications..." operationName="applications-page" />}>
          <Applications />
        </Suspense>
      </Route>
      <Route path="/products">
        <Suspense fallback={<SuspenseFallback message="Loading Products..." operationName="products-page" />}>
          <Products />
        </Suspense>
      </Route>
      <Route path="/roi-calculator">
        <Suspense fallback={<SuspenseFallback message="Loading ROI Calculator..." operationName="roi-calculator-page" />}>
          <ROICalculator />
        </Suspense>
      </Route>
      <Route path="/product-comparison" component={ProductComparison} />
      <Route path="/about">
        <Suspense fallback={<SuspenseFallback message="Loading About..." operationName="about-page" />}>
          <About />
        </Suspense>
      </Route>
      <Route path="/team" component={Team} />
      <Route path="/technology">
        <Suspense fallback={<SuspenseFallback message="Loading Technology..." operationName="technology-page" />}>
          <Technology />
        </Suspense>
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route path="/crm-login" component={CrmLogin} />
      <Route path="/crm-dashboard" component={CrmDashboard} />
      <Route path="/solar-crm" component={CRMDashboard} />
      <Route path="/crm" component={EnterpriseCARM} />
      <Route path="/analytics" component={AnalyticsDashboard} />
      <Route path="/financial-center" component={FinancialCenter} />
      <Route path="/data-processing" component={DataProcessingCenter} />
      <Route path="/inventory" component={InventoryPage} />
      <Route path="/rag-documents" component={RAGDocumentsPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/document-chat" component={DocumentChatInterface} />
      <ProtectedRoute path="/client-dashboard" component={ClientDashboard} />
      <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} adminOnly={true} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { metrics } = usePerformance();

  // Preload critical images once when app loads
  useEffect(() => {
    // Initialize error handler
    console.log('Solar Energy Platform initialized with enhanced error handling');

    // This triggers preloading of all critical site images
    preloadCriticalImages();

    // Force dark mode for both development and production
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#000';
    document.body.classList.add('dark');

    // Enhanced performance monitoring with error reporting
    if (typeof window !== 'undefined') {
      // Report largest contentful paint for performance monitoring
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && lastEntry.startTime > 0) {
          console.log(`Largest Contentful Paint: ${lastEntry.startTime}ms`);
          
          // Report very slow LCP as potential performance issue
          if (lastEntry.startTime > 5000) {
            errorHandler.reportManualError(
              `Very slow LCP detected: ${Math.round(lastEntry.startTime)}ms`, 
              'js_error'
            );
          }
        }
      });

      try {
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (error) {
        console.warn('LCP observer not supported in this browser');
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <StoreProvider>
            <Router />
            {/* Performance indicator - only show in development */}
            {import.meta.env.DEV && <PerformanceIndicator showDetails={true} />}
          </StoreProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;