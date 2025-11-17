import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Touchscreen, CreditCard, Droplets, Wind, ServerCog, Scaling } from "lucide-react";
import React from "react";

const SpecCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="bg-card/50 backdrop-blur-sm text-center hover:border-primary/50 transition-colors duration-300 h-full">
    <CardHeader className="items-center">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-4">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-foreground/70">{description}</p>
    </CardContent>
  </Card>
);

export const SpecsSection = () => {
  const { t } = useTranslation();

  const specs = [
    { icon: <Touchscreen className="h-8 w-8 text-primary" />, title: t('homePage.specs.touchscreen'), description: t('homePage.specs.touchscreenDesc') },
    { icon: <CreditCard className="h-8 w-8 text-primary" />, title: t('homePage.specs.payment'), description: t('homePage.specs.paymentDesc') },
    { icon: <Droplets className="h-8 w-8 text-primary" />, title: t('homePage.specs.slots'), description: t('homePage.specs.slotsDesc') },
    { icon: <Wind className="h-8 w-8 text-primary" />, title: t('homePage.specs.outlets'), description: t('homePage.specs.outletsDesc') },
    { icon: <ServerCog className="h-8 w-8 text-primary" />, title: t('homePage.specs.backend'), description: t('homePage.specs.backendDesc') },
    { icon: <Scaling className="h-8 w-8 text-primary" />, title: t('homePage.specs.dimensions'), description: t('homePage.specs.dimensionsDesc') },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            {t('homePage.specs.title')}
          </h2>
        </div>
        
        <div className="max-w-md mx-auto mb-16">
          <img
            src="/fragrance-machine.png"
            alt="Fragrance Vending Machine"
            className="w-full h-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, index) => (
            <SpecCard key={index} {...spec} />
          ))}
        </div>
      </div>
    </section>
  );
};