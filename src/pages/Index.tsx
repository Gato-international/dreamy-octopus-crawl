const Index = () => {
  const videoSrc = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const posterSrc = 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg';

  return (
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
      
      <div className="relative z-20 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Fragancao – Where Luxury Meets Innovation
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <img 
            src="/fragrance-machine.png" 
            alt="Fragrance Vending Machine" 
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Index;