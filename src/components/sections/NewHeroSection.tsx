import { useTranslation } from "react-i18next";

export const NewHeroSection = () => {
  const { t } = useTranslation();
  const videoSrc = 'https://oqhvemhomwksenicoktf.supabase.co/storage/v1/object/public/assets/background1.mp4';

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute z-10 inset-0 bg-neutral-900/70"></div>
      
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-foreground font-heading">
          {t('homePage.hero.slogan')}
        </h2>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};