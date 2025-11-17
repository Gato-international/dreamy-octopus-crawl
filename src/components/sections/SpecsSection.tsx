import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// The final, user-defined positions for the metric lines.
const finalMetricLines = {
  depth: { p1: { x: 68.56384166459017, y: 91.07653758280215 }, p2: { x: 79.16643790013991, y: 88.77906251967556 }, text: "222mm" },
  height: { p1: { x: 82.40301990888666, y: 9.056677829183347 }, p2: { x: 82.40301990888666, y: 83.03537486185913 }, text: "410mm" },
  width: { p1: { x: 20.907961742698213, y: 84.64360740604772 }, p2: { x: 65.9968973128255, y: 91.30628508911481 }, text: "730mm" },
};

export const SpecsSection = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("specs");

  const features = [
    // Left side
    {
      title: t('homePage.specs.step1_title'),
      description: t('homePage.specs.step1_desc'),
    },
    {
      title: t('homePage.specs.step2_title'),
      description: t('homePage.specs.step2_desc'),
    },
    {
      title: t('homePage.specs.step3_title'),
      description: t('homePage.specs.step3_desc'),
    },
    // Right side
    {
      title: t('homePage.specs.step4_title'),
      description: t('homePage.specs.step4_desc'),
    },
    {
      title: t('homePage.specs.step5_title'),
      description: t('homePage.specs.step5_desc'),
    },
  ];
  
  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3);

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
        
        <div className="flex justify-center items-center gap-4 mb-8">
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

        {/* Desktop View */}
        <div className="hidden md:block">
          {viewMode === 'specs' && (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 max-w-6xl mx-auto">
              {/* Left Column */}
              <div className="space-y-12">
                {leftFeatures.map((feature, index) => (
                  <div key={index} className="text-right">
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-foreground/70 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Center Column (Image) */}
              <div className="px-8">
                <img
                  src="/fragrance-machine-specs.png"
                  alt="Fragrance Vending Machine Features"
                  className="w-full max-w-sm h-auto rounded-lg mx-auto"
                />
              </div>

              {/* Right Column */}
              <div className="space-y-12">
                {rightFeatures.map((feature, index) => (
                  <div key={index} className="text-left">
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-foreground/70 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'metrics' && (
            <div className="relative max-w-5xl mx-auto">
              <div className="relative p-8 md:p-16">
                <img
                  src="/fragrance-machine-specs.png"
                  alt="Fragrance Vending Machine Features"
                  className="w-full h-auto rounded-lg"
                />
                
                <div className="absolute inset-8 md:inset-16">
                  <div className="absolute top-0 left-0 w-full h-full text-sm text-foreground/80">
                    <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none overflow-visible">
                      {Object.values(finalMetricLines).map((line, index) => {
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

                    {Object.values(finalMetricLines).map((line, index) => {
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
                        <p key={index} style={textStyle}>{line.text}</p>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile View */}
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