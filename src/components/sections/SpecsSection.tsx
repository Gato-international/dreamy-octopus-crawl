import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const LOCAL_STORAGE_KEY = 'fragancao-metrics-positions';

// A helper component for the draggable points
const DraggableHandle = ({ position, onMouseDown, cursor }: {
  position: { x: number; y: number };
  onMouseDown: (e: React.MouseEvent) => void;
  cursor: string;
}) => (
  <div
    style={{ top: `${position.y}%`, left: `${position.x}%`, cursor }}
    className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary/70 rounded-full pointer-events-auto ring-2 ring-background"
    onMouseDown={onMouseDown}
  />
);

export const SpecsSection = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("specs");
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultLines = {
    height: { x: 104, y1: 0, y2: 100, text: "410mm" },
    width: { y: 104, x1: 0, x2: 78, text: "730mm" },
    depth: { y: 104, x1: 78, x2: 100, text: "222mm" },
  };

  const [lines, setLines] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultLines;
    } catch (error) {
      console.error("Failed to parse metrics from localStorage", error);
      return defaultLines;
    }
  });

  const [dragging, setDragging] = useState<{ line: 'height' | 'width' | 'depth'; point: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lines));
    } catch (error) {
      console.error("Failed to save metrics to localStorage", error);
    }
  }, [lines]);

  const handleMouseDown = (e: React.MouseEvent, line: 'height' | 'width' | 'depth', point: string) => {
    e.preventDefault();
    setDragging({ line, point });
  };

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(110, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(110, ((e.clientY - rect.top) / rect.height) * 100));

    setLines(prevLines => {
      const newLines = JSON.parse(JSON.stringify(prevLines)); // Deep copy
      const currentLine = newLines[dragging.line];

      if (dragging.line === 'height') {
        if (dragging.point === 'x') currentLine.x = x;
        if (dragging.point === 'y1') currentLine.y1 = y;
        if (dragging.point === 'y2') currentLine.y2 = y;
      } else { // width or depth
        if (dragging.point === 'y') currentLine.y = y;
        if (dragging.point === 'x1') currentLine.x1 = x;
        if (dragging.point === 'x2') currentLine.x2 = x;
      }
      
      return newLines;
    });
  }, [dragging]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);


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
            
            <div ref={containerRef} className="absolute inset-8 md:inset-16 hidden md:block">
              
              {viewMode === 'metrics' && (
                <div className="absolute top-0 left-0 w-full h-full text-sm text-foreground/80">
                  {/* Height Line */}
                  <div style={{ left: `${lines.height.x}%`, top: `${lines.height.y1}%`, height: `${lines.height.y2 - lines.height.y1}%` }} className="absolute w-px bg-current pointer-events-none">
                    <div className="absolute top-0 -left-1 w-3 h-px bg-current"></div>
                    <div className="absolute bottom-0 -left-1 w-3 h-px bg-current"></div>
                  </div>
                  <p style={{ left: `${lines.height.x + 2}%`, top: `${(lines.height.y1 + lines.height.y2) / 2}%`, transform: 'translateY(-50%) rotate(90deg)' }} className="absolute origin-center whitespace-nowrap pointer-events-none">{lines.height.text}</p>
                  <DraggableHandle position={{ x: lines.height.x, y: lines.height.y1 }} onMouseDown={(e) => handleMouseDown(e, 'height', 'y1')} cursor="ns-resize" />
                  <DraggableHandle position={{ x: lines.height.x, y: lines.height.y2 }} onMouseDown={(e) => handleMouseDown(e, 'height', 'y2')} cursor="ns-resize" />
                  <DraggableHandle position={{ x: lines.height.x, y: (lines.height.y1 + lines.height.y2) / 2 }} onMouseDown={(e) => handleMouseDown(e, 'height', 'x')} cursor="ew-resize" />

                  {/* Width Line */}
                  <div style={{ top: `${lines.width.y}%`, left: `${lines.width.x1}%`, width: `${lines.width.x2 - lines.width.x1}%` }} className="absolute h-px bg-current pointer-events-none">
                    <div className="absolute left-0 -top-1 h-3 w-px bg-current"></div>
                    <div className="absolute right-0 -top-1 h-3 w-px bg-current"></div>
                  </div>
                  <p style={{ top: `${lines.width.y + 2}%`, left: `${(lines.width.x1 + lines.width.x2) / 2}%`, transform: 'translateX(-50%)' }} className="absolute pointer-events-none">{lines.width.text}</p>
                  <DraggableHandle position={{ x: lines.width.x1, y: lines.width.y }} onMouseDown={(e) => handleMouseDown(e, 'width', 'x1')} cursor="ew-resize" />
                  <DraggableHandle position={{ x: lines.width.x2, y: lines.width.y }} onMouseDown={(e) => handleMouseDown(e, 'width', 'x2')} cursor="ew-resize" />
                  <DraggableHandle position={{ x: (lines.width.x1 + lines.width.x2) / 2, y: lines.width.y }} onMouseDown={(e) => handleMouseDown(e, 'width', 'y')} cursor="ns-resize" />

                  {/* Depth Line */}
                  <div style={{ top: `${lines.depth.y}%`, left: `${lines.depth.x1}%`, width: `${lines.depth.x2 - lines.depth.x1}%` }} className="absolute h-px bg-current pointer-events-none">
                    <div className="absolute left-0 -top-1 h-3 w-px bg-current"></div>
                    <div className="absolute right-0 -top-1 h-3 w-px bg-current"></div>
                  </div>
                  <p style={{ top: `${lines.depth.y + 2}%`, left: `${(lines.depth.x1 + lines.depth.x2) / 2}%`, transform: 'translateX(-50%)' }} className="absolute pointer-events-none">{lines.depth.text}</p>
                  <DraggableHandle position={{ x: lines.depth.x1, y: lines.depth.y }} onMouseDown={(e) => handleMouseDown(e, 'depth', 'x1')} cursor="ew-resize" />
                  <DraggableHandle position={{ x: lines.depth.x2, y: lines.depth.y }} onMouseDown={(e) => handleMouseDown(e, 'depth', 'x2')} cursor="ew-resize" />
                  <DraggableHandle position={{ x: (lines.depth.x1 + lines.depth.x2) / 2, y: lines.depth.y }} onMouseDown={(e) => handleMouseDown(e, 'depth', 'y')} cursor="ns-resize" />
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