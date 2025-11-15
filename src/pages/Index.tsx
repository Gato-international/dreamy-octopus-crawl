import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Feature } from "@/components/ui/feature-with-image-carousel";

const Index = () => {
  const videoSrc = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const posterSrc = 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg';

  const featureRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: featureRef,
    offset: ["start end", "end end"],
  });

  const animationStart = 0.2;
  const animationEnd = 0.8;

  // I've increased the negative x-values to make the curve wider and more pronounced.
  const x = useTransform(
    scrollYProgress,
    [animationStart, 0.4, 0.6, animationEnd],
    ["0%", "-15%", "-55%", "-75%"]
  );
  const y = useTransform(
    scrollYProgress,
    [animationStart, 0.4, 0.6, animationEnd],
    ["0vh", "50vh", "100vh", "115vh"]
  );
  
  // The animating image fades out as the "sticky" one in the Feature component fades in.
  const imageOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 0.8], [0, 1, 1, 0]);
  const placeholderOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <>
      {/* This container holds the animating image. It's fixed and mirrors the hero layout to ensure the animation starts from the correct position. */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-30">
        <div className="container mx-auto px-4 h-full flex items-center">
            <div className="w-full grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2" /> {/* Spacer to push the image to the right */}
                <motion.div
                    className="md:col-span-3"
                    style={{ x, y, opacity: imageOpacity }}
                >
                    <img 
                        src="/fragrance-machine.png" 
                        alt="Fragrance Vending Machine" 
                        className="w-full h-auto object-contain"
                    />
                </motion.div>
            </div>
        </div>
      </div>

      <section className="relative h-screen w-full flex items-center overflow-hidden">
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
        
        <div className="relative z-20 container mx-auto px-4 grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Fragancao – Where Luxury Meets Innovation
            </h1>
          </div>
          {/* Placeholder for the animated image */}
          <div className="md:col-span-3">
             <motion.div style={{ opacity: placeholderOpacity }}>
                <img 
                  src="/fragrance-machine.png" 
                  alt="Fragrance Vending Machine" 
                  className="w-full h-auto object-contain"
                />
             </motion.div>
          </div>
        </div>
      </section>
      <div ref={featureRef}>
        <Feature scrollYProgress={scrollYProgress} />
      </div>
    </>
  );
};

export default Index;