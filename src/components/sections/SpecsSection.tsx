import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const SpecsSection = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("specs");

  const lines = {
    height: { p1: { x: 104, y: 0 }, p2: { x: 104, y: 100 }, text: "410mm" },
    width: { p1: { x: 0, y: 104 }, p2: { x: 78, y: 104 }, text: "730mm" },
    depth: { p1: { x: 78, y: 104 }, p2: { x: 100, y: 104 }, text: "222mm" },
  };

  const features = [
    // Left side
    {
      title: t('homePage.specs.step1_title'),
      description: t('homePage.specs.step1_desc'),
      textPosition: { top: '10%', left: '0%' },
      path: "M 120,150 Q 180,120 250,200",
      endPoint: { x: 250, y: 200 },
      textAlignment: 'text-left'
    },
    {
      title: t('homePage.specs.step2_title'),
      description: t('homePage.specs.step2_desc'),
      textPosition: { top: '40%', left: '0%' },
      path: "M 120,450 Q 180,480 250,350",
      endPoint: { x: 250, y: 350 },
      textAlignment: 'text-left'
    },
    {
      title: t('homePage.specs.step3_title'),
      description: t('homePage.specs.step3_desc'),
      textPosition: { top: '70%', left: '0%' },
      path: "M 120,750 Q 180,780 250,550",
      endPoint: { x: 250, y: 550 },
      textAlignment: 'text-left'
    },
    // Right side
    {
      title: t('homePage.specs.step4_title'),
      description: t('homePage.specs.step4_desc'),
      textPosition: { top: '35%', right: '0%' },
      path: "M 750,400 C 850,400 750,550 680,520",
      endPoint: { x: 680, y: 520 },
      textAlignment: 'text-right'
    },
    {
      title: t('homePage.specs.step5_title'),
      description: t('homePage.specs.step5_desc'),
      textPosition: { top: '65%', right: '0%' },
      path: "M 750,700 C 900,700 800,850 700,800",
      endPoint: { x: 700, y: 800 },
      textAlignment: 'text-right'
    },
  ];

  const mobileFeatures = [
    { title: t('homePage.specs.step1_title'), description: t('homePage.specs.step1_desc') },
    { title: t('homePage.specs.step2_title'), description: t('homePage.specs.step2_desc') },
    { title: t('homePage.specs.step3_title'), description: t('homePage.specs.step3_desc') },
    { title: t('homePage.specs.step4_title'), description: t('homePage.specs.step4_desc') },
    { title: t('homePage.specs.step5_title'), description: t('homePage.specs.step5_desc') },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 font-heading">
            {t('homePage.specs.title')}
          </h2>
        </div>
        
        <div className="hidden md:flex justify-center mb-8">
          <ToggleGroup 
            type="single" 
            defaultValue="specs" 
            value={viewMode}
            onValueChange={(value) => {
              if (value) setViewMode(value);
            }}
            aria-label="View mode"
          >
            <ToggleGroupItem value="specs" aria-label="Toggle specs">
              Specs
            </ToggleGroupItem>
            <ToggleGroupItem value="metrics" aria-label="Toggle metrics">
              Metrics
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative p-8 md:p-16">
            <img
              src="/fragrance-machine-specs.png"
              alt="Fragrance Vending Machine Features"
              className="w-full h-auto rounded-lg"
            />
            
            <div className="absolute inset-8 md:inset-16 hidden md:block">
              
              {viewMode === 'metrics' && (
                <div className="absolute top-0 left-0 w-full h-full text-sm text-foreground/80 pointer-events-none">
                  <svg width="100%" height="100%" className="absolute top-0 left-0 overflow-visible">
                    {Object.values(lines).map((line, index) => {
                      const dx = line.p2.x - line.p1.x;
                      const dy = line.p2.y - line.p1.y;
                      const angle = Math.atan2(dy, dx);
                      const perpAngle = angle + Math.PI / 2;
                      const capLength = 1; // in percent of width/height

                      const p1Cap1 = { x: line.p1.x + capLength * Math.cos(perpAngle), y: line.p1.y + capLength * Math.sin(perpAngle) };
                      const p1Cap2 = { x: line.p1.x - capLength * Math.cos(perpAngle), y: line.p1.y - capLength * Math.sin(perpAngle) };
                      const p2Cap1 = { x: line.p2.x + capLength * Math.cos(perpAngle), y: line.p2.y + capLength * Math.sin(perpAngle) };
                      const p2Cap2 = { x: line.p2.x - capLength * Math.cos(perpAngle), y: line.p2.y - capLength * Math.sin(perpAngle) };

                      return (
                        <g key={index}>
                          <line x1={`${line.p1.x}%`} y1={`${line.p1.y}%`} x2={`${line.p2.x}%`} y2={`${line.p2.y}%`} stroke="currentColor" strokeWidth="1" />
                          <line x1={`${p1Cap1.x}%`} y1={`${p1Cap1.y}%`} x2={`${p1Cap2.x}%`} y2={`${p1Cap2.y}%`} stroke="currentColor" strokeWidth="1" />
                          <line x1={`${p2Cap1.x}%`} y1={`${p2Cap1.y}%`} x2={`${p2Cap2.x}%`} y2={`${p2Cap2.y}%`} stroke="currentColor" strokeWidth="1" />
                        </g>
                      )
                    })}
                  </svg>

                  {Object.entries(lines).map(([key, line]) => {
                    const dx = line.p2.x - line.p1.x;
                    const dy = line.p2.y - line.p1.y;
                    const isVertical = Math.abs(dy) > Math.abs(dx);
                    const midX = (line.p1.x + line.p2.x) / 2;
                    const midY = (line.p1.y + line.p2.y) / 2;
                    
                    const textStyle: React.CSSProperties = {
                      position: 'absolute',
                      top: `${midY}%`,
                      left: `${midX}%`,
                      transform: `translate(-50%, -50%) ${isVertical ? 'rotate(90deg)' : ''} translate(0, -15px)`,
                      backgroundColor: 'hsl(var(--background) / 0.5)',
                      padding: '2px 4px',
                      borderRadius: '3px',
                      whiteSpace: 'nowrap',
                    };

                    return (
                      <p key={key} style={textStyle}>{line.text}</p>
                    )
                  })}
                </div>
              )}

              {viewMode === 'specs' && (
                <>
                  <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="overflow-visible">
                    {features.map((feature, index) => (
                      <g key={index}>
                        <path 
                          d={feature.path}
                          fill="none"
                          stroke="hsl(var(--primary))" 
                          strokeWidth="1" 
                          strokeDasharray="4 4"
                          opacity="0.7"
                        />
                        <circle 
                          cx={feature.endPoint.x} 
                          cy={feature.endPoint.y} 
                          r="8" 
                          fill="hsl(var(--primary))"
                          className="opacity-30"
                        />
                        <circle 
                          cx={feature.endPoint.x} 
                          cy={feature.endPoint.y} 
                          r="4" 
                          fill="hsl(var(--primary))"
                        />
                      </g>
                    ))}
                  </svg>

                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className={`absolute p-2 w-1/4 ${feature.textAlignment}`}
                      style={feature.textPosition}
                    >
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-foreground/70 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:hidden mt-12">
            {mobileFeatures.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card/50">
                    <h3 className="font-bold text-lg text-center">{feature.title}</h3>
                    <p className="text-foreground/70 text-sm text-center mt-2">{feature.description}</p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};