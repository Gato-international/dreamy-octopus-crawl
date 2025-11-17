import { Helmet } from "react-helmet-async";
import { NewHeroSection } from "@/components/sections/NewHeroSection";
import { WhatIsItSection } from "@/components/sections/WhatIsItSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CtaSection } from "@/components/sections/CtaSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fragancao – Luxury Automated Fragrance Vending Machines</title>
        <meta name="description" content="Elevate your venue with Fragancao's innovative perfume vending machines. Offer a unique, luxury experience and create a new revenue stream with zero upfront investment." />
      </Helmet>
      
      <NewHeroSection />
      <WhatIsItSection />
      <HowItWorksSection />
      <SpecsSection />
      <BenefitsSection />
      <CtaSection />
    </>
  );
};

export default Index;