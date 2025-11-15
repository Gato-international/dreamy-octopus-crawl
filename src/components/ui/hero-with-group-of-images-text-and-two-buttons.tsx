import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Where Every Spray Becomes an Experience
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Choose. Tap. Spray. Our Parfum Vending Machines offer visitors instant access to premium fragrances with seamless contactless payment. Whether it's a quick refresh after the gym, before a night out, or during a shopping break – luxury is just three seconds away.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4">
                Sign up here <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-md aspect-square flex items-center justify-center p-12">
              <img src="/select-finger.png" alt="Select fragrance" className="w-full h-full object-contain" />
            </div>
            <div className="rounded-md row-span-2">
              <img src="/fragrance-spray.png" alt="Person spraying fragrance" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="rounded-md aspect-square flex items-center justify-center p-12">
              <img src="/spray-bottle.png" alt="Spray fragrance" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };