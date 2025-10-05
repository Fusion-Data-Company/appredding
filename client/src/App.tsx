import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense } from "react";
import { preloadCriticalImages } from "@/utils/image-preloader";
import { errorHandler } from "@/utils/error-handler";
import { usePerformance } from "@/hooks/use-performance";
import { initializeCriticalPerformance, monitorPerformanceBudget } from "@/utils/performance-critical";
import { SuspenseFallback } from "@/components/ui/enhanced-loading";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { NetworkStatus } from "@/components/NetworkStatus";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";

const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ROICalculator = lazy(() => import('./pages/ROICalculator'));
const Technology = lazy(() => import('./pages/Technology'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const TechnicalData = lazy(() => import('./pages/TechnicalData'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));

const AdminDashboard = lazy(() => import('./pages/admin-dashboard'));
const ClientDashboard = lazy(() => import('./pages/client-dashboard'));
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'));

const CRM = lazy(() => import('./pages/CRM'));
const CrmLogin = lazy(() => import('./pages/crm-login'));
const EnterpriseCARM = lazy(() => import('./pages/EnterpriseCARM'));

const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Commerce = lazy(() => import('./pages/Commerce'));
const ProductComparison = lazy(() => import('./pages/ProductComparison'));

const ResidentialSolar = lazy(() => import('./pages/ResidentialSolar'));
const CommercialSolar = lazy(() => import('./pages/CommercialSolar'));
const HybridSolar = lazy(() => import('./pages/HybridSolar'));
const LithiumBattery = lazy(() => import('./pages/LithiumBattery'));
const EnergyConservation = lazy(() => import('./pages/EnergyConservation'));
const BatteryStorage = lazy(() => import('./pages/BatteryStorage'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Repairs = lazy(() => import('./pages/Repairs'));

const InventoryPage = lazy(() => import('./pages/inventory'));
const RAGDocumentsPage = lazy(() => import('./pages/rag-documents'));
const ChatPage = lazy(() => import('./pages/chat'));
const DocumentChatInterface = lazy(() => import('./pages/DocumentChatInterface'));
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SmoothScrollWrapper } from "@/components/ui/smooth-scroll-wrapper";

function Router() {
  const [location] = useLocation();
  const { metrics, isGoodPerformance } = usePerformance();

  // Preload images when routes change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location === '/') {
        // Home page already preloads critical images
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [location]);

  // Log route performance issues (reduced frequency)
  useEffect(() => {
    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 5000) {
      // Performance issue already logged in performance monitor
    }
  }, [location, metrics]);

  return (
    <Switch>
      {/* Redirects for old URLs to new structure */}
      <Route path="/residential-solar">
        {() => <Redirect to="/services/residential-solar" replace />}
      </Route>
      <Route path="/commercial-solar">
        {() => <Redirect to="/services/commercial-solar" replace />}
      </Route>
      <Route path="/hybrid-solar">
        {() => <Redirect to="/services/hybrid-solar" replace />}
      </Route>
      <Route path="/battery-storage">
        {() => <Redirect to="/services/battery-storage" replace />}
      </Route>
      <Route path="/maintenance">
        {() => <Redirect to="/services/maintenance" replace />}
      </Route>
      <Route path="/repairs">
        {() => <Redirect to="/services/repairs" replace />}
      </Route>
      <Route path="/energy-conservation">
        {() => <Redirect to="/services/energy-conservation" replace />}
      </Route>
      <Route path="/lithium-battery">
        {() => <Redirect to="/services/lithium-battery" replace />}
      </Route>
      <Route path="/products">
        {() => <Redirect to="/shop/products" replace />}
      </Route>
      <Route path="/cart">
        {() => <Redirect to="/shop/cart" replace />}
      </Route>
      <Route path="/checkout">
        {() => <Redirect to="/shop/checkout" replace />}
      </Route>
      <Route path="/product-comparison">
        {() => <Redirect to="/comparison" replace />}
      </Route>
      <Route path="/technology">
        {() => <Redirect to="/resources/technology" replace />}
      </Route>
      <Route path="/technical-data">
        {() => <Redirect to="/resources/technical-data" replace />}
      </Route>
      <Route path="/roi-calculator">
        {() => <Redirect to="/resources/roi-calculator" replace />}
      </Route>
      <Route path="/book-appointment">
        {() => <Redirect to="/resources/book-appointment" replace />}
      </Route>
      <Route path="/crm">
        {() => <Redirect to="/platform/crm" replace />}
      </Route>
      <Route path="/analytics">
        {() => <Redirect to="/platform/analytics" replace />}
      </Route>
      <Route path="/inventory">
        {() => <Redirect to="/platform/inventory" replace />}
      </Route>
      
      {/* Core Marketing Pages */}
      <Route path="/" component={Home} />
      <Route path="/about">
        <Suspense fallback={<SuspenseFallback message="Loading About..." operationName="about-page" />}>
          <About />
        </Suspense>
      </Route>
      <Route path="/team">
        <Suspense fallback={<SuspenseFallback message="Loading Team..." operationName="team-page" />}>
          <Team />
        </Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<SuspenseFallback message="Loading Contact..." operationName="contact-page" />}>
          <Contact />
        </Suspense>
      </Route>
      <Route path="/portfolio">
        <Suspense fallback={<SuspenseFallback message="Loading Portfolio..." operationName="portfolio-page" />}>
          <Portfolio />
        </Suspense>
      </Route>
      
      {/* Services Pages */}
      <Route path="/services/residential-solar">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="residential-solar" />}>
          <ResidentialSolar />
        </Suspense>
      </Route>
      <Route path="/services/commercial-solar">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="commercial-solar" />}>
          <CommercialSolar />
        </Suspense>
      </Route>
      <Route path="/services/hybrid-solar">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="hybrid-solar" />}>
          <HybridSolar />
        </Suspense>
      </Route>
      <Route path="/services/battery-storage">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="battery-storage" />}>
          <BatteryStorage />
        </Suspense>
      </Route>
      <Route path="/services/maintenance">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="maintenance" />}>
          <Maintenance />
        </Suspense>
      </Route>
      <Route path="/services/repairs">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="repairs" />}>
          <Repairs />
        </Suspense>
      </Route>
      <Route path="/services/energy-conservation">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="energy-conservation" />}>
          <EnergyConservation />
        </Suspense>
      </Route>
      <Route path="/services/lithium-battery">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="lithium-battery" />}>
          <LithiumBattery />
        </Suspense>
      </Route>
      
      
      {/* Commerce Pages */}
      <Route path="/shop/products">
        <Suspense fallback={<SuspenseFallback message="Loading Products..." operationName="products-page" />}>
          <Products />
        </Suspense>
      </Route>
      <Route path="/shop/cart">
        <Suspense fallback={<SuspenseFallback message="Loading Cart..." operationName="cart-page" />}>
          <Cart />
        </Suspense>
      </Route>
      <Route path="/shop/checkout">
        <Suspense fallback={<SuspenseFallback message="Loading Checkout..." operationName="checkout-page" />}>
          <Checkout />
        </Suspense>
      </Route>
      <Route path="/shop/order/confirmation/:orderNumber">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="order-confirmation" />}>
          <OrderConfirmation />
        </Suspense>
      </Route>
      <Route path="/comparison">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="comparison" />}>
          <ProductComparison />
        </Suspense>
      </Route>
      
      {/* Resources Pages */}
      <Route path="/resources/technology">
        <Suspense fallback={<SuspenseFallback message="Loading Technology..." operationName="technology-page" />}>
          <Technology />
        </Suspense>
      </Route>
      <Route path="/resources/technical-data">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="technical-data" />}>
          <TechnicalData />
        </Suspense>
      </Route>
      <Route path="/resources/roi-calculator">
        <Suspense fallback={<SuspenseFallback message="Loading ROI Calculator..." operationName="roi-calculator-page" />}>
          <ROICalculator />
        </Suspense>
      </Route>
      <Route path="/resources/book-appointment">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="book-appointment" />}>
          <BookAppointment />
        </Suspense>
      </Route>
      
      {/* Platform Pages */}
      <Route path="/platform/crm">
        <Suspense fallback={<SuspenseFallback message="Loading CRM..." operationName="crm-page" />}>
          <CRM />
        </Suspense>
      </Route>
      <Route path="/platform/analytics">
        <Suspense fallback={<SuspenseFallback message="Loading Analytics..." operationName="analytics-page" />}>
          <AnalyticsDashboard />
        </Suspense>
      </Route>
      <Route path="/platform/inventory">
        <Suspense fallback={<SuspenseFallback message="Loading Inventory..." operationName="inventory-page" />}>
          <InventoryPage />
        </Suspense>
      </Route>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminDashboard} adminOnly={true} />
      <ProtectedRoute path="/dashboard" component={ClientDashboard} />
      
      {/* Legacy routes - temporarily kept for compatibility - will be removed later */}
      <Route path="/crm">
        <Suspense fallback={<SuspenseFallback message="Loading CRM..." operationName="crm-page" />}>
          <CRM />
        </Suspense>
      </Route>
      <Route path="/crm-login">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="crm-login" />}>
          <CrmLogin />
        </Suspense>
      </Route>
      <Route path="/enterprise-carm">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="enterprise-carm" />}>
          <EnterpriseCARM />
        </Suspense>
      </Route>
      <Route path="/commerce">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="commerce" />}>
          <Commerce />
        </Suspense>
      </Route>
      <Route path="/rag-documents">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="rag-documents" />}>
          <RAGDocumentsPage />
        </Suspense>
      </Route>
      <Route path="/chat">
        <Suspense fallback={<SuspenseFallback message="Loading Chat..." operationName="chat-page" />}>
          <ChatPage />
        </Suspense>
      </Route>
      <Route path="/document-chat">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="document-chat" />}>
          <DocumentChatInterface />
        </Suspense>
      </Route>
      <Route path="/residential-solar">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="residential-solar" />}>
          <ResidentialSolar />
        </Suspense>
      </Route>
      <Route path="/commercial-solar">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="commercial-solar" />}>
          <CommercialSolar />
        </Suspense>
      </Route>
      <Route path="/hybrid-solar">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="hybrid-solar" />}>
          <HybridSolar />
        </Suspense>
      </Route>
      <Route path="/battery-storage">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="battery-storage" />}>
          <BatteryStorage />
        </Suspense>
      </Route>
      <Route path="/maintenance">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="maintenance" />}>
          <Maintenance />
        </Suspense>
      </Route>
      <Route path="/repairs">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="repairs" />}>
          <Repairs />
        </Suspense>
      </Route>
      <Route path="/energy-conservation">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="energy-conservation" />}>
          <EnergyConservation />
        </Suspense>
      </Route>
      <Route path="/lithium-battery">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="lithium-battery" />}>
          <LithiumBattery />
        </Suspense>
      </Route>
      <Route path="/products">
        <Suspense fallback={<SuspenseFallback message="Loading Products..." operationName="products-page" />}>
          <Products />
        </Suspense>
      </Route>
      <Route path="/cart">
        <Suspense fallback={<SuspenseFallback message="Loading Cart..." operationName="cart-page" />}>
          <Cart />
        </Suspense>
      </Route>
      <Route path="/checkout">
        <Suspense fallback={<SuspenseFallback message="Loading Checkout..." operationName="checkout-page" />}>
          <Checkout />
        </Suspense>
      </Route>
      <Route path="/product-comparison">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="comparison" />}>
          <ProductComparison />
        </Suspense>
      </Route>
      <Route path="/book-appointment">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="book-appointment" />}>
          <BookAppointment />
        </Suspense>
      </Route>
      <Route path="/technical-data">
        <Suspense fallback={<SuspenseFallback message="Loading..." operationName="technical-data" />}>
          <TechnicalData />
        </Suspense>
      </Route>
      <Route path="/technology">
        <Suspense fallback={<SuspenseFallback message="Loading Technology..." operationName="technology-page" />}>
          <Technology />
        </Suspense>
      </Route>
      <Route path="/roi-calculator">
        <Suspense fallback={<SuspenseFallback message="Loading ROI Calculator..." operationName="roi-calculator-page" />}>
          <ROICalculator />
        </Suspense>
      </Route>
      <Route path="/analytics">
        <Suspense fallback={<SuspenseFallback message="Loading Analytics..." operationName="analytics-page" />}>
          <AnalyticsDashboard />
        </Suspense>
      </Route>
      <Route path="/inventory">
        <Suspense fallback={<SuspenseFallback message="Loading Inventory..." operationName="inventory-page" />}>
          <InventoryPage />
        </Suspense>
      </Route>
      
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

    // Force dark mode first (blocking)
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#000';
    document.body.classList.add('dark');

    // Defer expensive operations to not block initial render
    setTimeout(() => {
      preloadCriticalImages();
    }, 100);

    // Enhanced performance monitoring with error reporting
    if (typeof window !== 'undefined') {
      // Report largest contentful paint for performance monitoring
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && lastEntry.startTime > 0) {
          
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
        
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <NetworkStatus />
          <AuthProvider>
            <SmoothScrollWrapper disableOnRoutes={["/services/lithium-battery", "/lithium-battery"]}>
              <RouteErrorBoundary>
                <Router />
              </RouteErrorBoundary>
            </SmoothScrollWrapper>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;