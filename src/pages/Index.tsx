const Index = () => {
  const videoSrc = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const posterSrc = 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg';

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Immersive Video Experience</h1>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          Welcome to our homepage. Below you can see our featured video.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
          <video
            src={videoSrc}
            controls
            poster={posterSrc}
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default Index;