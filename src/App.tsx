import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import DashboardLayout from "./pages/admin/DashboardLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import HeroManager from "./pages/admin/HeroManager";
import AboutManager from "./pages/admin/AboutManager";
import GalleryManager from "./pages/admin/GalleryManager";
import FeaturesManager from "./pages/admin/FeaturesManager";
import PricingManager from "./pages/admin/PricingManager";
import ContactManager from "./pages/admin/ContactManager";
import ProfileManager from "./pages/admin/ProfileManager";
import SettingsManager from "./pages/admin/SettingsManager";
import MediaManager from "./pages/admin/MediaManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>
          <Route path="/fragadmin99201" element={<Login />} />
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="media" element={<MediaManager />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="features" element={<FeaturesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="pricing" element={<PricingManager />} />
            <Route path="contact" element={<ContactManager />} />
            <Route path="profile" element={<ProfileManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;