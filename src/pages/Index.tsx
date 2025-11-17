import { Helmet } from "react-helmet-async";
import { NewHeroSection } from "@/components/sections/NewHeroSection";
import { WhatIsItSection } from "@/components/sections/WhatIsItSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { Hero } from "@/components/ui/animated-hero";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loader onLoaded={() => setIsLoading(false)} />;
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Fragancao – Luxury Automated Fragrance Vending Machines</title>
        <meta name="description" content="Elevate your venue with Fragancao's innovative perfume vending machines. Offer a unique, luxury experience and create a new revenue stream with zero upfront investment." />
      </Helmet>
      
      <NewHeroSection />
      <WhatIsItSection />
      <HowItWorksSection />
      <SpecsSection />
      <BenefitsSection />
      <Hero />
    </MainLayout>
  );
};

export default Index;