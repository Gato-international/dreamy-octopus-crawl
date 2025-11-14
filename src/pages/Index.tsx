const Index = () => {
  return (
    <section className="h-screen w-full flex items-center bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Fragancao – Where Luxury Meets Innovation
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
            Discover a new era of fragrance with our state-of-the-art vending solutions, bringing premium scents to you, instantly.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img 
            src="/fragrance-machine.png" 
            alt="Fragrance Vending Machine" 
            className="w-full max-w-lg h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Index;