import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AnimatedBackground } from "@/components/ui/hero-section";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNav } from "./MobileNav";
import { CookieBanner } from "@/components/CookieBanner";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={cn(
      "flex flex-col min-h-screen",
      isMobile ? 'pb-16' : '',
      isHomePage && 'bg-background'
    )}>
      {!isHomePage && <AnimatedBackground />}
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
      <MobileNav />
      <CookieBanner />
    </div>
  );
};

export default MainLayout;