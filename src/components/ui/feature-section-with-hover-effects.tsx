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
      title: "Higher Revenue, Lower Costs",
      description: "Generate extra revenue per square meter without the need for additional staff.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "24/7 Self-Service",
      description: "Fully autonomous and always available during your opening hours for maximum convenience.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Luxurious Eyecatcher",
      description: "A modern and elegant design that instantly enhances the appeal of your location.",
      icon: <IconHeart />,
    },
    {
      title: "Strategic Placement",
      description: "Perfect for high-traffic zones such as entrances, restrooms, and walkways.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Efficient & Autonomous",
      description: "The machine operates completely independently, leading to maximum profitability.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Unique Customer Experience",
      description: "Offer your visitors an unforgettable and interactive moment of sophistication.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Maximum Visibility",
      description: "Ideal for food courts or entertainment areas to attract a wide audience.",
      icon: <IconCloud />,
    },
    {
      title: "Hassle-Free Management",
      description: "We handle installation, maintenance, and inventory. You don't have to do a thing.",
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