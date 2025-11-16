import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Pricing = () => {
  const { t } = useTranslation();

  const pricingTiers = [
    {
      name: t('pricingPage.tiers.placement.name'),
      description: t('pricingPage.tiers.placement.description'),
      price: t('pricingPage.tiers.placement.price'),
      features: t('pricingPage.tiers.placement.features', { returnObjects: true }) as string[],
      cta: t('pricingPage.tiers.placement.cta'),
      popular: false,
    },
    {
      name: t('pricingPage.tiers.franchise.name'),
      description: t('pricingPage.tiers.franchise.description'),
      price: t('pricingPage.tiers.franchise.price'),
      features: t('pricingPage.tiers.franchise.features', { returnObjects: true }) as string[],
      cta: t('pricingPage.tiers.franchise.cta'),
      popular: true,
    },
    {
      name: t('pricingPage.tiers.enterprise.name'),
      description: t('pricingPage.tiers.enterprise.description'),
      price: t('pricingPage.tiers.enterprise.price'),
      features: t('pricingPage.tiers.enterprise.features', { returnObjects: true }) as string[],
      cta: t('pricingPage.tiers.enterprise.cta'),
      popular: false,
    },
  ];

  return (
    <div className="container max-w-screen-lg py-12 pt-24 sm:pt-32">
      <div className="text-center mb-12 lg:mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {t('pricingPage.title')}
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-3xl mx-auto">
          {t('pricingPage.description')}
        </p>
      </div>

      <div className="text-center mb-12 lg:mb-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
           {t('pricingPage.earnWithEverySpray.title')}
        </h2>
        <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-3xl mx-auto">
          {t('pricingPage.earnWithEverySpray.description')}
        </p>
      </div>

      <Card className="mb-12 lg:mb-20 max-w-4xl mx-auto bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t('pricingPage.revenueExample.title')}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">40</p>
            <p className="text-foreground/80">{t('pricingPage.revenueExample.spraysPerDay')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold">€120</p>
            <p className="text-foreground/80">{t('pricingPage.revenueExample.dailyRevenue')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold">€3.600</p>
            <p className="text-foreground/80">{t('pricingPage.revenueExample.monthlyRevenue')}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-foreground/60 mx-auto text-center">
            {t('pricingPage.revenueExample.disclaimer')}
          </p>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col h-full ${tier.popular ? "border-primary shadow-lg" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.popular && <Badge variant="default">{t('pricingPage.tiers.franchise.popular')}</Badge>}
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-6">{tier.price}</p>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
                <Link to="/contact">{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;