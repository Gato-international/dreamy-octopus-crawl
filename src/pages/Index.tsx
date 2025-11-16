import { Hero as HeroSection2 } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import { LinkPreview } from "@/components/ui/link-preview";
import ThumbnailCarousel from "@/components/ui/thumbnail-carousel";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  const heroContent = {
    videoSrc: 'https://videos.pexels.com/video-files/5194137/5194137-hd_1920_1080_25fps.mp4',
    posterSrc: 'https://images.pexels.com/photos/3250623/pexels-photo-3250623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    headline: 'Luxe Geurervaring, Altijd en Overal',
    imageSrc: '/fragrance-machine-gallery.png',
  };

  return (
    <>
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <video
          src={heroContent.videoSrc}
          poster={heroContent.posterSrc}
          autoPlay
          loop
          muted
          className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute z-10 inset-0 bg-black/50"></div>
        
        <div className="relative z-20 container mx-auto px-4 grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {heroContent.headline}
            </h1>
          </div>
          <div className="md:col-span-3">
            <img 
              src={heroContent.imageSrc} 
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
              The Deluxe Vending machine offers an exclusive{" "}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Olfaction"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                scent experience
              </LinkPreview>{" "}
              in an elegant, high-end{" "}
              <LinkPreview
                url="https://dribbble.com/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                design
              </LinkPreview>
              . This luxury device dispenses premium{" "}
              <LinkPreview
                url="https://www.fragrantica.com/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                perfumes
              </LinkPreview>
              , carefully selected to offer customers a moment of sophistication and{" "}
              <LinkPreview
                url="https://www.chanel.com/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                luxury
              </LinkPreview>
              . With five exclusive fragrances, the machine provides a quick, refreshing experience for anyone looking to envelop themselves in a refined scent. The modern design also adds extra luxury to any location, while the user-friendly{" "}
              <LinkPreview
                url="https://www.nngroup.com/articles/user-interface-design/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                interface
              </LinkPreview>{" "}
              ensures an effortless and enjoyable experience.
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
      <Testimonials />
    </>
  );
};

export default Index;