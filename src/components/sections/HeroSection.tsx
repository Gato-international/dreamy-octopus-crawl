"use client";
 
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedAdjectives } from "@/components/ui/AnimatedAdjectives";
 
const colors = {
  50: "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};
 
export const HeroSection = () => {
  const { t } = useTranslation();
  const gradientRef = useRef<HTMLDivElement>(null);
  const adjectives = t('animatedHero.adjectives', { returnObjects: true }) as string[];
 
  useEffect(() => {
    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
 
    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.background = "rgba(200, 180, 160, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);
 
    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll<HTMLElement>(".floating-element").forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = "running";
          }, index * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);
 
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
 
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] text-[#e6e1d7] overflow-hidden relative w-full"
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(200,180,160,0.08)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
 
      <div className="floating-element" style={{ top: "25%", left: "15%" }}></div>
      <div className="floating-element" style={{ top: "60%", left: "85%" }}></div>
      <div className="floating-element" style={{ top: "40%", left: "10%" }}></div>
      <div className="floating-element" style={{ top: "75%", left: "90%" }}></div>
 
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
 
      <div
        id="mouse-gradient"
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
        style={{
          background: `radial-gradient(circle, ${colors[500]}0D 0%, transparent 100%)`,
        }}
      ></div>
    </div>
  );
}