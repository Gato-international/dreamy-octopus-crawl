import { Hero as HeroSection2 } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import { LinkPreview } from "@/components/ui/link-preview";
import ThumbnailCarousel from "@/components/ui/thumbnail-carousel";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

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
      <section className="py-12 lg:py-24">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-white">What is Fragancoa?</h2>
            <p className="text-white text-2xl leading-snug tracking-wide">
              De Luxe Vending machine biedt een exclusieve{" "}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Olfaction"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                geurervaring
              </LinkPreview>{" "}
              in een elegant, high-end{" "}
              <LinkPreview
                url="https://dribbble.com/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                design
              </LinkPreview>
              . Dit luxe apparaat spuit premium{" "}
              <LinkPreview
                url="https://www.fragrantica.com/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                parfums
              </LinkPreview>
              , zorgvuldig geselecteerd om klanten een moment van verfijning en{" "}
              <LinkPreview
                url="https://www.chanel.com/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                luxe
              </LinkPreview>{" "}
              te bieden. Met vijf exclusieve geuren biedt de machine een
              snelle, verfrissende ervaring voor iedereen die zich wil omhullen
              in een verfijnde geur. Het moderne ontwerp voegt bovendien extra
              luxe toe aan elke locatie, terwijl de gebruiksvriendelijke{" "}
              <LinkPreview
                url="https://www.nngroup.com/articles/user-interface-design/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                interface
              </LinkPreview>{" "}
              zorgt voor een moeiteloze en plezierige ervaring.
            </p>
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