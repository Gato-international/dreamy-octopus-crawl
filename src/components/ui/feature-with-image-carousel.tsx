import { Badge } from "@/components/ui/badge";
import { motion, useTransform, type MotionValue } from "framer-motion";

function Feature({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const stickyImageOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-end gap-10">
          {/* This container holds the "sticky" image that appears at the end of the animation */}
          <div className="w-full max-w-full px-6">
            <motion.div style={{ opacity: stickyImageOpacity }}>
              <img
                src="/fragrance-machine.png"
                alt="Fragrance Vending Machine"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                This is the start of something new
              </h2>
              <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster than
                ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };