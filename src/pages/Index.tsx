import { Hero as HeroSection2 } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import ThumbnailCarousel from "@/components/ui/thumbnail-carousel";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { Fingerprint, CreditCard, Sparkles } from "lucide-react";

const Index = () => {
  const videoSrc = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const posterSrc = 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg';

  return (
    <>
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
          <div className="md:col-span-3">
            <img 
              src="/fragrance-machine.png" 
              alt="Fragrance Vending Machine" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
      
      <section className="py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-white">An Experience in Three Simple Steps</h2>
            <p className="text-lg text-foreground/80">
              From selection to sensation, discover how easy it is to indulge in a moment of luxury.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <Fingerprint className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">1. Select Your Scent</h3>
              <p className="text-foreground/70">
                Browse our curated collection of five premium perfumes on the vibrant touchscreen. Find the perfect fragrance to match your mood or occasion.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">2. Tap to Pay</h3>
              <p className="text-foreground/70">
                A seamless, contactless payment is all it takes. Simply tap your card or phone for a quick and secure transaction.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">3. Enjoy the Mist</h3>
              <p className="text-foreground/70">
                Position yourself and let our machine dispense a fine, even mist of your chosen fragrance. Step out feeling refreshed and confident.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <HeroSection2 />
      </section>
      <section className="py-12 lg:py-24">
        <div className="container mx-auto">
          <ThumbnailCarousel />
        </div>
      </section>
      <section className="py-12 lg:py-24">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Features</h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>
    </>
  );
};

export default Index;