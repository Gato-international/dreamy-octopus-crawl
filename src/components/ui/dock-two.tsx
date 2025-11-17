"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import React, { useRef, ElementType } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DockItemData = {
  icon: ElementType;
  label: string;
  onClick: () => void;
};

type DockProps = {
  items: DockItemData[];
};

const DockItem = ({
  mouseX,
  item,
}: {
  mouseX: MotionValue;
  item: DockItemData;
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return Number(val) - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [48, 80, 48]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          style={{ width }}
          className="flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full bg-background"
          onClick={item.onClick}
        >
          <item.icon className="h-6 w-6" />
        </motion.button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{item.label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const Dock = ({ items }: DockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Infinity);

  return (
    <TooltipProvider>
      <div className="flex justify-center">
        <div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex h-16 items-end justify-center gap-3 rounded-full bg-secondary/50 px-3 pb-3 backdrop-blur-md"
        >
          {items.map((item, i) => (
            <DockItem key={i} mouseX={mouseX} item={item} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};