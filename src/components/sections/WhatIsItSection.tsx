import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

export const WhatIsItSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section className="relative -mt-48 pt-64 sm:pt-80 pb-20 sm:pb-32">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 font-heading">
              {t('homePage.whatIsIt.title')}
            </h2>
            <div className="space-y-4 text-lg text-foreground/80">
              {isMobile ? (
                <p>{t('homePage.whatIsIt.mobile_paragraph')}</p>
              ) : (
                <>
                  <p>{t('homePage.whatIsIt.paragraph1')}</p>
                  <p>{t('homePage.whatIsIt.paragraph2')}</p>
                  <p>{t('homePage.whatIsIt.paragraph3')}</p>
                  <p>{t('homePage.whatIsIt.paragraph4')}</p>
                </>
              )}
            </div>
          </div>
          <div className="md:col-span-3">
            <img 
              src="/fragrance-machine-in-lounge.png" 
              alt="Woman using the Fragrance Vending Machine" 
              className="rounded-lg w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );