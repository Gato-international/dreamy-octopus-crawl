import { useTranslation } from "react-i18next";
import React from "react";

const FeatureHotspot = ({
  top,
  left,
  title,
  description,
  direction = "left",
}: {
  top: string;
  left: string;
  title: string;
  description: string;
  direction?: "left" | "right";
}) => {
  const positionClasses = {
    left: "left-0 translate-x-[-100%]",
    right: "right-0 translate-x-[100%]",
  };

  return (
    <div className="absolute group" style={{ top, left }}>
      <div className="relative flex items-center">
        <div className="w-4 h-4 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300 animate-pulse"></div>
        <div className={`absolute top-1/2 -translate-y-1/2 w-48 p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${direction === 'left' ? 'right-8' : 'left-8'}`}>
          <h4 className="font-bold text-primary">{title}</h4>
          <p className="text-sm text-foreground/80">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const SpecsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            {t('homePage.specs.title')}
          </h2>
        </div>
        <div className="relative max-w-md mx-auto">
          <img
            src="/fragrance-machine.png"
            alt="Fragrance Vending Machine"
            className="w-full h-auto"
          />
          <FeatureHotspot top="15%" left="10%" title={t('homePage.specs.touchscreen')} description={t('homePage.specs.touchscreenDesc')} direction="left" />
          <FeatureHotspot top="35%" left="15%" title={t('homePage.specs.payment')} description={t('homePage.specs.paymentDesc')} direction="left" />
          <FeatureHotspot top="55%" left="20%" title={t('homePage.specs.slots')} description={t('homePage.specs.slotsDesc')} direction="left" />
          <FeatureHotspot top="25%" left="85%" title={t('homePage.specs.outlets')} description={t('homePage.specs.outletsDesc')} direction="right" />
          <FeatureHotspot top="45%" left="80%" title={t('homePage.specs.backend')} description={t('homePage.specs.backendDesc')} direction="right" />
          <FeatureHotspot top="80%" left="90%" title={t('homePage.specs.dimensions')} description={t('homePage.specs.dimensionsDesc')} direction="right" />
        </div>
      </div>
    </section>
  );
};