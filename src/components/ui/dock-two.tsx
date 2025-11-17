"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DockProps {
  items: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
  }[];
}

// This explicit type annotation fixes the TypeScript error.
const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -2, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const Dock = ({ items }: DockProps) => {
  return (
    <TooltipProvider>
      <motion.div
        initial="initial"
        animate="animate"
        variants={floatingAnimation}
        className="mx-auto flex h-16 items-center justify-center gap-4 rounded-2xl bg-background/70 backdrop-blur-md px-4"
      >
        {items.map((item, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <button
                onClick={item.onClick}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50 transition-colors hover:bg-secondary"
                aria-label={item.label}
              >
                <item.icon className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </TooltipProvider>
  );
};