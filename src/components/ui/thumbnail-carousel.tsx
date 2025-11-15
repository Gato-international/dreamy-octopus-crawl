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
    { x: 48, y: 45, title: 'Touch Screen Display', description: 'A high-resolution 27-inch touch screen for easy fragrance selection and an interactive experience.' },
    { x: 25, y: 78, title: 'Fragrance Nozzle', description: 'Dispenses a fine, precise mist of your chosen luxury fragrance.' },
    { x: 75, y: 78, title: 'Payment Terminal', description: 'Accepts all major credit cards and contactless payments for a seamless transaction.' }
  ]
};

export default function ThumbnailCarousel() {
  return (
    <div className='w-full max-w-3xl mx-auto p-4 lg:p-10'>
      <div className='relative overflow-hidden rounded-lg bg-gray-100'>
        <div className='relative shrink-0 w-full h-[400px]'>
          <img
            src={item.url}
            alt={item.title}
            className='w-full h-full object-cover rounded-lg select-none pointer-events-none'
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
    </div>
  );
}