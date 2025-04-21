import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CRM from "@/pages/CRM";
import PainterNetwork from "@/pages/PainterNetwork";
import Marinas from "@/pages/Marinas";
import FirePrevention from "@/pages/FirePrevention";
import Pools from "@/pages/Pools";
import Construction from "@/pages/Construction";
import MobileHome from "@/pages/MobileHome";
import Municipality from "@/pages/Municipality";
import Applications from "@/pages/Applications";
import ProductComparison from "@/pages/ProductComparison";
import AuthPage from "@/pages/auth-page";
import ClientDashboard from "@/pages/client-dashboard";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/crm" component={CRM} />
      <Route path="/painter-network" component={PainterNetwork} />
      <Route path="/marinas" component={Marinas} />
      <Route path="/fire-prevention" component={FirePrevention} />
      <Route path="/pools" component={Pools} />
      <Route path="/construction" component={Construction} />
      <Route path="/mobile-home" component={MobileHome} />
      <Route path="/municipality" component={Municipality} />
      <Route path="/applications" component={Applications} />
      <Route path="/product-comparison" component={ProductComparison} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/client-dashboard" component={ClientDashboard} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
