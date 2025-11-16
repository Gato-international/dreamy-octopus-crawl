import ThumbnailCarousel from "@/components/ui/thumbnail-carousel";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { Fingerprint, CreditCard, Sparkles, Check } from "lucide-react";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const { t } = useTranslation();
  const videoSrc = 'https://oqhvemhomwksenicoktf.supabase.co/storage/v1/object/public/assets/Untitled design (1).mp4';

  return (
    <>
      <Helmet>
        <title>Fragancao – Luxury Automated Fragrance Vending Machines</title>
        <meta name="description" content="Elevate your venue with Fragancao's innovative perfume vending machines. Offer a unique, luxury experience and create a new revenue stream with zero upfront investment." />
      </Helmet>
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute z-10 inset-0 bg-black/50"></div>
        
        <div className="relative z-20 container mx-auto px-4 grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {t('indexPage.mainHero.title')}
            </h1>
          </div>
          <div className="md:col-span-3">
            <img 
              src="/fragrance-machine.png" 
              alt="Fragrance Vending Machine" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      <section>
        <AnimatedHero />
      </section>

      <section className="py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">{t('indexPage.engineeredForElegance.title')}</h2>
              <p className="text-lg text-foreground/80 mb-8">
                {t('indexPage.engineeredForElegance.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{t('indexPage.engineeredForElegance.features.design.title')}</h4>
                    <p className="text-foreground/70">{t('indexPage.engineeredForElegance.features.design.description')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{t('indexPage.engineeredForElegance.features.touchscreen.title')}</h4>
                    <p className="text-foreground/70">{t('indexPage.engineeredForElegance.features.touchscreen.description')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{t('indexPage.engineeredForElegance.features.atomization.title')}</h4>
                    <p className="text-foreground/70">{t('indexPage.engineeredForElegance.features.atomization.description')}</p>
                  </div>
                </li>
                 <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{t('indexPage.engineeredForElegance.features.payments.title')}</h4>
                    <p className="text-foreground/70">{t('indexPage.engineeredForElegance.features.payments.description')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="/fragrance-machine-gallery.png" 
                alt="Fragrance Vending Machine Close-up" 
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto">
          <ThumbnailCarousel />
        </div>
      </section>
      <section className="py-12 lg:py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">{t('indexPage.featuresSection.title')}</h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>
      
      <section className="py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{t('indexPage.seamlessExperience.title')}</h2>
            <p className="text-lg text-foreground/80">
              {t('indexPage.seamlessExperience.description')}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <Fingerprint className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('indexPage.seamlessExperience.steps.selection.title')}</h3>
              <p className="text-foreground/70">
                {t('indexPage.seamlessExperience.steps.selection.description')}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('indexPage.seamlessExperience.steps.payment.title')}</h3>
              <p className="text-foreground/70">
                {t('indexPage.seamlessExperience.steps.payment.description')}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('indexPage.seamlessExperience.steps.luxury.title')}</h3>
              <p className="text-foreground/70">
                {t('indexPage.seamlessExperience.steps.luxury.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;