import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FeatureText from "@/components/FeatureText";

const Index = () => {
  const videoSrc = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const posterSrc = 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg';

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Animate image properties
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const x = useTransform(scrollYProgress, [0, 0.5], ["35%", "-15%"]);

  // Animate text opacity
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const featureTextOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <div ref={targetRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute z-10 inset-0 bg-black/50"></div>

        <div className="relative z-20 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column for Image */}
          <motion.div style={{ scale, x }} className="md:col-span-1">
            <img 
              src="/fragrance-machine.png" 
              alt="Fragrance Vending Machine" 
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Right Column for Text */}
          <div className="md:col-span-1 relative h-48">
            <motion.div 
              style={{ opacity: heroTextOpacity }} 
              className="absolute inset-0"
            >
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                  Fragancao – Where Luxury Meets Innovation
                </h1>
              </div>
            </motion.div>
            <motion.div 
              style={{ opacity: featureTextOpacity }}
              className="absolute inset-0"
            >
              <FeatureText />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;