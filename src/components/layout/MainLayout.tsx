import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AnimatedBackground } from "@/components/ui/hero-section";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Header />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;