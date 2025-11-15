import React from 'react';
import Hotspot from './Hotspot';

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
    { x: 85, y: 90, title: 'Voeding', description: 'Werkt op een standaard 230V stopcontact.' },
    { x: 50, y: 25, title: 'Plaatsing & Onderhoud', description: 'De plaatsing en het onderhoud worden volledig door ons verzorgd.' },
    { x: 50, y: 65, title: 'Voorraadbeheer', description: 'Wij vullen, controleren en onderhouden de voorraad in de machine.' }
  ]
};

export default function ThumbnailCarousel() {
  return (
    <div className='w-full max-w-3xl mx-auto p-4 lg:p-10'>
      <div className="relative w-fit mx-auto">
        {/* Image and Hotspots */}
        <div className='relative overflow-hidden rounded-lg'>
          <div className='relative shrink-0 w-full h-[400px]'>
            <img
              src={item.url}
              alt={item.title}
              className='w-full h-full object-cover rounded-lg'
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

        {/* Width Dimension */}
        <div className="absolute -bottom-8 left-0 right-0 flex flex-col items-center text-gray-400">
          <div className="w-full flex justify-between">
            <div className="w-px h-2 bg-current"></div>
            <div className="w-px h-2 bg-current"></div>
          </div>
          <div className="w-full h-px bg-current -mt-2"></div>
          <span className="text-xs mt-2">60cm breed</span>
        </div>

        {/* Height Dimension */}
        <div className="absolute -right-10 top-0 bottom-0 flex items-center text-gray-400">
          <div className="h-full flex flex-col justify-between">
            <div className="h-px w-2 bg-current"></div>
            <div className="h-px w-2 bg-current"></div>
          </div>
          <div className="h-full w-px bg-current -ml-2"></div>
          <span className="text-xs ml-2 [writing-mode:vertical-rl] rotate-180">180cm hoog</span>
        </div>
      </div>
    </div>
  );
}