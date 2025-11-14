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

  // Slower animation over a longer scroll distance ([0.2, 0.8])
  // Corrected final position (x: "10vw", y: "115vh")
  const x = useTransform(scrollYProgress, [0.2, 0.8], ["30vw", "10vw"]);
  const y = useTransform(scrollYProgress, [0.2, 0.8], ["0vh", "115vh"]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [1, 0.6]);
  
  // Smoother cross-fade between placeholder and moving image
  const imageOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const placeholderOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1/2 md:w-1/3 z-30 pointer-events-none"
        style={{ x, y, scale, opacity: imageOpacity }}
      >
        <img 
          src="/fragrance-machine.png" 
          alt="Fragrance Vending Machine" 
          className="w-full h-auto object-contain"
        />
      </motion.div>

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