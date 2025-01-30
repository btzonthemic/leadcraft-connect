import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HeatPumpInstallation from "./pages/HeatPumpInstallation";
import PlumbingServices from "./pages/PlumbingServices";
import ElectricalServices from "./pages/ElectricalServices";
import HeatingServices from "./pages/HeatingServices";
import Dashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/heat-pump-installation" element={<HeatPumpInstallation />} />
          <Route path="/plumbing-services" element={<PlumbingServices />} />
          <Route path="/electrical-services" element={<ElectricalServices />} />
          <Route path="/heating-services" element={<HeatingServices />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;