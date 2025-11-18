"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children?: React.ReactNode;
  items: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
  }[];
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      magnification = 60,
      distance = 80,
      items,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderItems = () => {
      return items.map((item, i) => (
        <AppIcon
          key={i}
          mouseX={mouseX}
          magnification={magnification}
          distance={distance}
          onClick={item.onClick}
        >
          <item.icon className="h-6 w-6" />
        </AppIcon>
      ));
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), className)}
      >
        {renderItems()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

const dockVariants = cva(
  "mx-auto w-max mt-8 h-[58px] p-2 flex items-end gap-2 rounded-2xl border dark:border-[#707070]",
);

const AppIcon = ({
  mouseX,
  magnification,
  distance,
  children,
  onClick,
}: {
  mouseX: any;
  magnification?: number;
  distance?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { width, left } = ref.current
    ? ref.current.getBoundingClientRect()
    : { width: 0, left: 0 };

  const distanceCalc = useTransform(mouseX, (val) => val - left - width / 2);
  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );
  const widthSpring = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const floatingAnimation: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ width: widthSpring }}
      className="aspect-square w-10 cursor-pointer rounded-full bg-neutral-400/40 flex items-center justify-center"
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        initial="initial"
        animate="animate"
        variants={floatingAnimation}
        className={cn(
          "flex aspect-square w-full items-center justify-center rounded-full",
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

AppIcon.displayName = "AppIcon";

export { Dock, AppIcon, dockVariants };