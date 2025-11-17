"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DockItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  mouseX: any;
}

const DockItem: React.FC<DockItemProps> = ({ icon: Icon, label, onClick, mouseX }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square w-10 rounded-full bg-secondary/50 backdrop-blur-md flex items-center justify-center cursor-pointer"
            onClick={onClick}
          >
            <Icon className="h-6 w-6 text-secondary-foreground" />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface DockProps {
  items: {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
  }[];
}

const floatingAnimation: Variants = {
  initial: {
    y: 10,
  },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const Dock: React.FC<DockProps> = ({ items }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      animate="animate"
      variants={floatingAnimation}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-transparent px-4 pb-3"
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
};