import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AnimatedBackground } from "@/components/ui/hero-section";
import { MobileNav } from "./MobileNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Header />
      <main className="flex-grow relative z-10 pb-24 lg:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default MainLayout;