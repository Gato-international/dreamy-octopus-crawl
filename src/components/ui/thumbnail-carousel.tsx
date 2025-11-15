import React from 'react';
import Hotspot from './Hotspot';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HotspotData {
  x: number;
  y: number;
  title: string;
  description: string;
}

interface CarouselItem {
  id: number;
  url: string;
  title: string;
  hotspots?: HotspotData[];
}

const item: CarouselItem = {
  id: 0,
  url: '/fragrance-machine-gallery.png',
  title: 'Fragrance Vending Machine',
  hotspots: [
    { x: 15, y: 50, title: 'Afmetingen', description: 'Ongeveer 60cm breed, 60cm diep, en 180cm hoog.' },
    { x: 85, y: 90, title: 'Voeding', description: 'Werkt op een standaard 230V stopcontact.' },
    { x: 50, y: 25, title: 'Plaatsing & Onderhoud', description: 'De plaatsing en het onderhoud worden volledig door ons verzorgd.' },
    { x: 50, y: 65, title: 'Voorraadbeheer', description: 'Wij vullen, controleren en onderhouden de voorraad in de machine.' }
  ]
};

export default function ThumbnailCarousel() {
  return (
    <div className='w-full max-w-3xl mx-auto p-4 lg:p-10'>
      <Dialog>
        <DialogTrigger asChild>
          <div className='relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer group'>
            <div className='relative shrink-0 w-full h-[400px]'>
              <img
                src={item.url}
                alt={item.title}
                className='w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105'
                draggable={false}
              />
              {item.hotspots?.map((hotspot, hotspotIndex) => (
                <Hotspot
                  key={hotspotIndex}
                  x={hotspot.x}
                  y={hotspot.y}
                  title={hotspot.title}
                  description={hotspot.description}
                />
              ))}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80vw] p-0 border-0 bg-transparent">
          <img
            src={item.url}
            alt={item.title}
            className='w-full h-auto max-h-[90vh] object-contain rounded-lg'
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}