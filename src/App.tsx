import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail";
import Favorites from "./pages/Favorites";
import Chatbot from "./pages/Chatbot";
import HowItWorks from "./pages/HowItWorks";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import VideoTutorial from "./pages/VideoTutorial";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import PageTransition from "./components/PageTransition";
import { AppearanceProvider } from "./context/AppearanceContext";
import { AppearanceLauncher } from "./components/AppearancePanel";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/tools" element={<Navigate to="/home" replace />} />
        <Route path="/tools/:id" element={<PageTransition><ToolDetail /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
        <Route path="/chatbot" element={<PageTransition><Chatbot /></PageTransition>} />
        <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
        <Route path="/tutorials" element={<PageTransition><VideoTutorial /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppearanceProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
          <AppearanceLauncher />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </AppearanceProvider>
  </QueryClientProvider>
);

export default App;
