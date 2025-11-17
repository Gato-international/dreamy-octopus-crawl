import { useTranslation } from "react-i18next";

export const WhatIsItSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-background -mt-[18vh] pt-[25vh] pb-20 sm:pb-32">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 font-heading">
              {t('homePage.whatIsIt.title')}
            </h2>
            <div className="space-y-4 text-lg text-foreground/80">
              <p>{t('homePage.whatIsIt.paragraph1')}</p>
              <p>{t('homePage.whatIsIt.paragraph2')}</p>
              <p>{t('homePage.whatIsIt.paragraph3')}</p>
              <p>{t('homePage.whatIsIt.paragraph4')}</p>
            </div>
          </div>
          <div>
            <img 
              src="/fragrance-machine-gallery.png" 
              alt="Fragrance Vending Machine Close-up" 
              className="rounded-lg w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};