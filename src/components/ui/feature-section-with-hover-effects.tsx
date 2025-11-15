"use client";

import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import React from "react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Hogere Omzet, Lagere Kosten",
      description: "Genereer extra inkomsten per vierkante meter zonder de noodzaak voor extra personeel.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "24/7 Self-Service",
      description: "Volledig autonoom en altijd beschikbaar binnen uw openingstijden voor maximaal gemak.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Luxe Eyecatcher",
      description: "Een modern en elegant design dat de uitstraling van uw locatie direct verhoogt.",
      icon: <IconHeart />,
    },
    {
      title: "Strategische Plaatsing",
      description: "Perfect voor high-traffic zones zoals entrees, toiletten, en looproutes.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Efficiënt & Autonoom",
      description: "De machine werkt volledig zelfstandig, wat leidt tot maximale winstgevendheid.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Unieke Klantbeleving",
      description: "Bied uw bezoekers een onvergetelijk en interactief moment van verfijning.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Maximale Zichtbaarheid",
      description: "Ideaal voor food courts of uitgaansgebieden om een breed publiek aan te trekken.",
      icon: <IconCloud />,
    },
    {
      title: "Zorgeloos Beheer",
      description: "Wij verzorgen de plaatsing, het onderhoud en de voorraad. U hoeft niets te doen.",
      icon: <IconHelp />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-white group-hover/feature:text-black transition-colors duration-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white group-hover/feature:text-black">
          {title}
        </span>
      </div>
      <p className="text-sm text-white/80 group-hover/feature:text-black/80 max-w-xs relative z-10 px-10 transition-colors duration-200">
        {description}
      </p>
    </div>
  );
};