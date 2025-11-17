import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/ui/hero-section";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fragancao – Luxury Automated Fragrance Vending Machines</title>
        <meta name="description" content="Elevate your venue with Fragancao's innovative perfume vending machines. Offer a unique, luxury experience and create a new revenue stream with zero upfront investment." />
      </Helmet>
      <HeroSection />
    </>
  );
};

export default Index;