import { useTranslation } from "react-i18next";
import { MousePointerClick, CreditCard, Sparkles, PartyPopper } from "lucide-react";
import React from "react";

const Step = ({ icon, title, description, stepNumber }: { icon: React.ReactNode, title: string, description: string, stepNumber: number }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative mb-6">
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-secondary">
        {icon}
      </div>
      <div className="absolute -top-2 -right-2 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold">
        {stepNumber}
      </div>
    </div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-foreground/70 max-w-xs">{description}</p>
  </div>
);

export const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <MousePointerClick className="h-10 w-10 text-primary" />,
      title: t('homePage.howItWorks.step1.title'),
      description: t('homePage.howItWorks.step1.description'),
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: t('homePage.howItWorks.step2.title'),
      description: t('homePage.howItWorks.step2.description'),
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: t('homePage.howItWorks.step3.title'),
      description: t('homePage.howItWorks.step3.description'),
    },
    {
      icon: <PartyPopper className="h-10 w-10 text-primary" />,
      title: t('homePage.howItWorks.step4.title'),
      description: t('homePage.howItWorks.step4.description'),
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-secondary/20 glow-border-top">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 font-heading">
            {t('homePage.howItWorks.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <Step key={index} {...step} stepNumber={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};