
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

// Auth pages
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Case Manager pages
import CaseManagerDashboard from "./pages/case-manager/Dashboard";
import NewReferral from "./pages/case-manager/NewReferral";
import Referrals from "./pages/case-manager/Referrals";
import ReferralTracker from "./pages/case-manager/ReferralTracker";
import MatchedProviders from "./pages/case-manager/MatchedProviders";
import CaseManagerSettings from "./pages/case-manager/Settings";

// Provider pages
import ProviderDashboard from "./pages/provider/Dashboard";
import ProviderReferrals from "./pages/provider/Referrals";
import ProviderReferralTracker from "./pages/provider/ReferralTracker";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminReferrals from "./pages/admin/Referrals";
import AdminUserManagement from "./pages/admin/UserManagement";
import AdminReferralMatching from "./pages/admin/ReferralMatching";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Case Manager routes */}
            <Route path="/case-manager" element={<CaseManagerDashboard />} />
            <Route path="/case-manager/new-referral" element={<NewReferral />} />
            <Route path="/case-manager/referrals" element={<Referrals />} />
            <Route path="/case-manager/matched-providers/:referralId" element={<MatchedProviders />} />
            <Route path="/case-manager/referral-tracker/:referralId" element={<ReferralTracker />} />
            <Route path="/case-manager/settings" element={<CaseManagerSettings />} />
            
            {/* Provider routes */}
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/referrals" element={<ProviderReferrals />} />
            <Route path="/provider/referral-tracker/:referralId" element={<ProviderReferralTracker />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/referrals" element={<AdminReferrals />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/referral-matching/:referralId" element={<AdminReferralMatching />} />
            
            {/* Redirect old routes to new structured routes */}
            <Route path="/referrals" element={<Navigate to="/case-manager/referrals" replace />} />
            <Route path="/new-referral" element={<Navigate to="/case-manager/new-referral" replace />} />
            <Route path="/matched-providers/:referralId" element={<Navigate to="/case-manager/matched-providers/:referralId" replace />} />
            <Route path="/referral-tracker/:referralId" element={<Navigate to="/case-manager/referral-tracker/:referralId" replace />} />
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
