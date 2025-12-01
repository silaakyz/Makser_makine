// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Dashboard from "./pages/Dashboard";
import Uretim from "./pages/Uretim";
import Makine from "./pages/Makine";
import Stoklar from "./pages/Stoklar";
import Siparisler from "./pages/Siparisler";
import Finansal from "./pages/Finansal";
import Uyarilar from "./pages/Uyarilar";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProductionModule from "./modules/Production/ProductionModule";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1128] to-[#122044]">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth route - public */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/uretim" element={<ProtectedRoute><Uretim /></ProtectedRoute>} />
            <Route path="/makine" element={<ProtectedRoute><Makine /></ProtectedRoute>} />
            <Route path="/stoklar" element={<ProtectedRoute><Stoklar /></ProtectedRoute>} />
            <Route path="/siparisler" element={<ProtectedRoute><Siparisler /></ProtectedRoute>} />
            <Route path="/finansal" element={<ProtectedRoute><Finansal /></ProtectedRoute>} />
            <Route path="/uyarilar" element={<ProtectedRoute><Uyarilar /></ProtectedRoute>} />
            <Route path="/yeni-uretim" element={<ProtectedRoute><ProductionModule /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
