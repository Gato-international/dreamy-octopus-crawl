import { useTranslation } from "react-i18next";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TrendingUp, BadgePercent, MapPin, Smartphone } from "lucide-react";
import React from "react";

export const BenefitsSection = () => {
  const { t } = useTranslation();

  const benefits = [
    { 
      icon: <TrendingUp className="h-12 w-12 text-primary" />, 
      title: t('homePage.benefits.benefit1.title'), 
      description: t('homePage.benefits.benefit1.description') 
    },
    { 
      icon: <BadgePercent className="h-12 w-12 text-primary" />, 
      title: t('homePage.benefits.benefit2.title'), 
      description: t('homePage.benefits.benefit2.description') 
    },
    { 
      icon: <MapPin className="h-12 w-12 text-primary" />, 
      title: t('homePage.benefits.benefit3.title'), 
      description: t('homePage.benefits.benefit3.description') 
    },
    { 
      icon: <Smartphone className="h-12 w-12 text-primary" />, 
      title: t('homePage.benefits.benefit4.title'), 
      description: t('homePage.benefits.benefit4.description') 
    },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 font-heading">
            {t('homePage.benefits.title')}
          </h2>
        </div>
        <BentoGrid>
          {benefits.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};