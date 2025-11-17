import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";

// The initial, user-defined positions for the metric lines.
const initialMetricLines = {
  depth: { p1: { x: 68.56384166459017, y: 91.07653758280215 }, p2: { x: 79.16643790013991, y: 88.77906251967556 }, text: "222mm" },
  height: { p1: { x: 82.40301990888666, y: 9.056677829183347 }, p2: { x: 82.40301990888666, y: 83.03537486185913 }, text: "410mm" },
  width: { p1: { x: 20.907961742698213, y: 84.64360740604772 }, p2: { x: 65.9968973128255, y: 91.30628508911481 }, text: "730mm" },
};

const initialSpecLines = {
  line1: { p1: { x: 32, y: 25 }, p2: { x: 38, y: 30 }, textPos: { x: 28, y: 23 } },
  line2: { p1: { x: 32, y: 50 }, p2: { x: 38, y: 50 }, textPos: { x: 28, y: 48 } },
  line3: { p1: { x: 32, y: 75 }, p2: { x: 40, y: 75 }, textPos: { x: 28, y: 73 } },
  line4: { p1: { x: 68, y: 33 }, p2: { x: 60, y: 28 }, textPos: { x: 72, y: 31 } },
  line5: { p1: { x: 68, y: 66 }, p2: { x: 60, y: 40 }, textPos: { x: 72, y: 64 } },
};

type Point = { x: number; y: number };
type MetricLine = { p1: Point; p2: Point; text: string };
type SpecLine = { p1: Point; p2: Point; textPos: Point };
type MetricLines = { [key: string]: MetricLine };
type SpecLines = { [key: string]: SpecLine };

export const SpecsSection = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("specs");
  
  const [metricLines, setMetricLines] = useState<MetricLines>(initialMetricLines);
  const [draggingPoint, setDraggingPoint] = useState<{ lineKey: string; pointKey: 'p1' | 'p2' } | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [specLines, setSpecLines] = useState<SpecLines>(initialSpecLines);
  const [draggingSpecPoint, setDraggingSpecPoint] = useState<{ lineKey: string; pointKey: 'p1' | 'p2' } | null>(null);
  const [draggingSpecText, setDraggingSpecText] = useState<string | null>(null);
  const specContainerRef = useRef<HTMLDivElement>(null);

  // Handlers for Metric Lines
  const handleMouseDown = (e: React.MouseEvent, lineKey: string, pointKey: 'p1' | 'p2') => {
    e.preventDefault();
    setDraggingPoint({ lineKey, pointKey });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingPoint || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMetricLines(prev => ({ ...prev, [draggingPoint.lineKey]: { ...prev[draggingPoint.lineKey], [draggingPoint.pointKey]: { x, y } } }));
  };

  const handleMouseUp = () => setDraggingPoint(null);

  useEffect(() => {
    if (draggingPoint) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingPoint]);

  // Handlers for Spec Lines
  const handleSpecMouseDown = (e: React.MouseEvent, lineKey: string, pointKey: 'p1' | 'p2') => {
    e.preventDefault();
    setDraggingSpecPoint({ lineKey, pointKey });
  };

  const handleSpecMouseMove = (e: MouseEvent) => {
    if (!draggingSpecPoint || !specContainerRef.current) return;
    const rect = specContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpecLines(prev => ({ ...prev, [draggingSpecPoint.lineKey]: { ...prev[draggingSpecPoint.lineKey], [draggingSpecPoint.pointKey]: { x, y } } }));
  };

  const handleSpecMouseUp = () => setDraggingSpecPoint(null);

  useEffect(() => {
    if (draggingSpecPoint) {
      window.addEventListener("mousemove", handleSpecMouseMove);
      window.addEventListener("mouseup", handleSpecMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleSpecMouseMove);
      window.removeEventListener("mouseup", handleSpecMouseUp);
    };
  }, [draggingSpecPoint]);

  // Handlers for Spec Text
  const handleSpecTextMouseDown = (e: React.MouseEvent, lineKey: string) => {
    e.preventDefault();
    setDraggingSpecText(lineKey);
  };

  const handleSpecTextMouseMove = (e: MouseEvent) => {
    if (!draggingSpecText || !specContainerRef.current) return;
    const rect = specContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpecLines(prev => ({
      ...prev,
      [draggingSpecText]: {
        ...prev[draggingSpecText],
        textPos: { x, y },
      },
    }));
  };

  const handleSpecTextMouseUp = () => {
    setDraggingSpecText(null);
  };

  useEffect(() => {
    if (draggingSpecText) {
      window.addEventListener("mousemove", handleSpecTextMouseMove);
      window.addEventListener("mouseup", handleSpecTextMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleSpecTextMouseMove);
      window.removeEventListener("mouseup", handleSpecTextMouseUp);
    };
  }, [draggingSpecText]);

  const logCoordinates = () => {
    if (viewMode === 'metrics') {
      console.log("const finalMetricLines = ", JSON.stringify(metricLines, null, 2));
      showSuccess("Metric coordinates logged to the developer console!");
    } else {
      console.log("const finalSpecLines = ", JSON.stringify(specLines, null, 2));
      showSuccess("Spec coordinates logged to the developer console!");
    }
  };

  const features = [
    { title: t('homePage.specs.step1_title'), description: t('homePage.specs.step1_desc') },
    { title: t('homePage.specs.step2_title'), description: t('homePage.specs.step2_desc') },
    { title: t('homePage.specs.step3_title'), description: t('homePage.specs.step3_desc') },
    { title: t('homePage.specs.step4_title'), description: t('homePage.specs.step4_desc') },
    { title: t('homePage.specs.step5_title'), description: t('homePage.specs.step5_desc') },
  ];
  
  const mobileFeatures = features;

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
            onValueChange={(value) => { if (value) setViewMode(value); }}
            aria-label="View mode"
          >
            <ToggleGroupItem value="specs" aria-label="Toggle specs">Specs</ToggleGroupItem>
            <ToggleGroupItem value="metrics" aria-label="Toggle metrics">Metrics</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="flex flex-col items-center gap-4">
            {viewMode === 'specs' && (
              <div className="relative w-full" ref={specContainerRef}>
                <img src="/fragrance-machine-specs.png" alt="Fragrance Vending Machine Specs" className="w-full h-auto rounded-lg" />
                <div className="absolute inset-0">
                  <svg className="w-full h-full pointer-events-none" aria-hidden="true">
                    {Object.values(specLines).map((line, index) => (
                      <line key={index} x1={`${line.p1.x}%`} y1={`${line.p1.y}%`} x2={`${line.p2.x}%`} y2={`${line.p2.y}%`} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-foreground/30" />
                    ))}
                  </svg>
                  {Object.entries(specLines).map(([key, line], index) => (
                    <React.Fragment key={key}>
                      <div onMouseDown={(e) => handleSpecMouseDown(e, key, 'p1')} style={{ left: `${line.p1.x}%`, top: `${line.p1.y}%` }} className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full cursor-grab active:cursor-grabbing" />
                      <div onMouseDown={(e) => handleSpecMouseDown(e, key, 'p2')} style={{ left: `${line.p2.x}%`, top: `${line.p2.y}%` }} className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full cursor-grab active:cursor-grabbing" />
                      <div
                        onMouseDown={(e) => handleSpecTextMouseDown(e, key)}
                        style={{
                          position: 'absolute',
                          left: `${line.textPos.x}%`,
                          top: `${line.textPos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          cursor: 'grab',
                          backgroundColor: 'hsl(var(--background) / 0.7)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                          userSelect: 'none',
                        }}
                        className="active:cursor-grabbing text-sm"
                      >
                        {features[index]?.title}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'metrics' && (
              <div className="relative w-full" ref={imageContainerRef}>
                <img src="/fragrance-machine-specs.png" alt="Fragrance Vending Machine Metrics" className="w-full h-auto rounded-lg" />
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none overflow-visible">
                    {Object.values(metricLines).map((line, index) => {
                      const dx = line.p2.x - line.p1.x; const dy = line.p2.y - line.p1.y;
                      const angle = Math.atan2(dy, dx); const perpAngle = angle + Math.PI / 2;
                      const capLength = 1;
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
                  {Object.entries(metricLines).map(([key, line]) => {
                    const dx = line.p2.x - line.p1.x; const dy = line.p2.y - line.p1.y;
                    const isVertical = Math.abs(dy) > Math.abs(dx);
                    const midX = (line.p1.x + line.p2.x) / 2; const midY = (line.p1.y + line.p2.y) / 2;
                    const textStyle: React.CSSProperties = {
                      position: 'absolute', top: `${midY}%`, left: `${midX}%`,
                      transform: `translate(-50%, -50%) ${isVertical ? 'rotate(90deg)' : ''} translate(0, -15px)`,
                      backgroundColor: 'hsl(var(--background) / 0.5)', padding: '2px 4px', borderRadius: '3px', whiteSpace: 'nowrap',
                    };
                    return (
                      <React.Fragment key={key}>
                        <div onMouseDown={(e) => handleMouseDown(e, key, 'p1')} style={{ left: `${line.p1.x}%`, top: `${line.p1.y}%` }} className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full cursor-grab active:cursor-grabbing" />
                        <div onMouseDown={(e) => handleMouseDown(e, key, 'p2')} style={{ left: `${line.p2.x}%`, top: `${line.p2.y}%` }} className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full cursor-grab active:cursor-grabbing" />
                        <p style={textStyle}>{line.text}</p>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
            )}
            <Button onClick={logCoordinates} variant="outline" size="sm">Log Coordinates</Button>
          </div>
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