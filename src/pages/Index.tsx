import { Helmet } from "react-helmet-async";
import { WhatIsItSection } from "@/components/sections/WhatIsItSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { Hero } from "@/components/ui/animated-hero";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fragancao – Luxury Automated Fragrance Vending Machines</title>
        <meta name="description" content="Elevate your venue with Fragancao's innovative perfume vending machines. Offer a unique, luxury experience and create a new revenue stream with zero upfront investment." />
      </Helmet>
      
      <Hero />
      <WhatIsItSection />
      <HowItWorksSection />
      <SpecsSection />
      <BenefitsSection />
    </>
  );
};

export default Index;