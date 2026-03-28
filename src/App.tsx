import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MembersPage from "./pages/MembersPage";
import PendingPage from "./pages/PendingPage";
import ScheduledPage from "./pages/ScheduledPage";
import ProductPage from "./pages/ProductPage";
import SettingsPage from "./pages/SettingsPage";
import ReportPage from "./pages/ReportPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MembersPage />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/scheduled" element={<ScheduledPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
