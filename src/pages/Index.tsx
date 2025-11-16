import ThumbnailCarousel from "@/components/ui/thumbnail-carousel";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { Fingerprint, CreditCard, Sparkles, Check } from "lucide-react";
import { AnimatedHero } from "@/components/ui/animated-hero";

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

      <section>
        <AnimatedHero />
      </section>

      <section className="py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Engineered for Elegance</h2>
              <p className="text-lg text-foreground/80 mb-8">
                Our vending machine is more than just a dispenser; it's a statement piece designed to blend seamlessly into any luxury environment. Every detail has been meticulously crafted to offer an unparalleled user experience.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Sleek & Compact Design</h4>
                    <p className="text-foreground/70">With a width of just 60cm, its minimalist aesthetic complements any interior, from hotel lobbies to exclusive clubs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Interactive Touchscreen</h4>
                    <p className="text-foreground/70">A vibrant, high-definition display guides users through scent selection with beautiful visuals and intuitive navigation.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Advanced Atomization</h4>
                    <p className="text-foreground/70">Our patented technology ensures a perfect, fine mist application every time, maximizing the fragrance experience without waste.</p>
                  </div>
                </li>
                 <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Secure Contactless Payments</h4>
                    <p className="text-foreground/70">Equipped with the latest NFC technology for fast, secure, and convenient tap-to-pay transactions.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="/fragrance-machine-gallery.png" 
                alt="Fragrance Vending Machine Close-up" 
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto">
          <ThumbnailCarousel />
        </div>
      </section>
      <section className="py-12 lg:py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Our Features</h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>
      
      <section className="py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">A Seamless Experience for Your Guests</h2>
            <p className="text-lg text-foreground/80">
              Our machine offers a simple, intuitive journey for your customers, creating a memorable, premium amenity that generates effortless revenue for your business.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <Fingerprint className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">1. Intuitive Selection</h3>
              <p className="text-foreground/70">
                Guests browse a curated collection of premium perfumes on the vibrant touchscreen, finding the perfect scent to elevate their experience at your venue.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">2. Effortless Payment</h3>
              <p className="text-foreground/70">
                With modern contactless payment technology, transactions are quick, secure, and seamless. A simple tap is all it takes.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">3. A Touch of Luxury</h3>
              <p className="text-foreground/70">
                Our advanced atomization delivers a perfect mist, providing a sophisticated fragrance experience that leaves a lasting positive impression.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;