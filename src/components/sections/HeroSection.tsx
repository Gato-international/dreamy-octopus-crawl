"use client";
 
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedAdjectives } from "@/components/ui/AnimatedAdjectives";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
 
const colors = {
  50: "#f8f7f5",
  200: "#c8b4a0",
};
 
export const HeroSection = () => {
  const { t } = useTranslation();
  const adjectives = t('animatedHero.adjectives', { returnObjects: true }) as string[];
 
  return (
    <div className="relative min-h-screen w-full text-[#e6e1d7]">
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-8 py-12 md:px-16 md:py-20 text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight tracking-tight"
          style={{ color: colors[50] }}
        >
          {t('animatedHero.title1')}
          <br />
          {t('animatedHero.title2')}{' '}
          <span className="text-primary font-bold"><AnimatedAdjectives adjectives={adjectives} /></span>
        </h1>
        <p
          className="mt-6 text-lg md:text-xl font-light leading-relaxed max-w-3xl"
          style={{ color: colors[200] }}
        >
          {t('animatedHero.description')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/contact">{t('animatedHero.requestConsultation')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/pricing">{t('animatedHero.becomePartner')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};