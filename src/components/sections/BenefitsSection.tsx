import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, BadgePercent, MapPin, Smartphone } from "lucide-react";
import React from "react";

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="bg-card text-center hover:border-primary/50 transition-colors duration-300 h-full">
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

export const BenefitsSection = () => {
  const { t } = useTranslation();

  const benefits = [
    { icon: <TrendingUp className="h-8 w-8 text-primary" />, title: t('homePage.benefits.benefit1.title'), description: t('homePage.benefits.benefit1.description') },
    { icon: <BadgePercent className="h-8 w-8 text-primary" />, title: t('homePage.benefits.benefit2.title'), description: t('homePage.benefits.benefit2.description') },
    { icon: <MapPin className="h-8 w-8 text-primary" />, title: t('homePage.benefits.benefit3.title'), description: t('homePage.benefits.benefit3.description') },
    { icon: <Smartphone className="h-8 w-8 text-primary" />, title: t('homePage.benefits.benefit4.title'), description: t('homePage.benefits.benefit4.description') },
  ];

  return (
    <section className="pb-20 sm:pb-32">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 font-heading">
            {t('homePage.benefits.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};