const Index = () => {
  const videoSrc = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const posterSrc = 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg';

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
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
      <div className="relative z-20 px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Fragancao – Where Luxury Meets Innovation
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
          Welcome to our homepage. Below you can see our featured video.
        </p>
      </div>
    </section>
  );
};

export default Index;