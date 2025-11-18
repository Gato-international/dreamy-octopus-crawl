import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";

const initialMetricLines = {
  "depth": {
    "p1": {
      "x": 66.93,
      "y": 89.41
    },
    "p2": {
      "x": 75.42,
      "y": 86.65
    },
    "text": "222mm"
  },
  "height": {
    "p1": {
      "x": 78.45,
      "y": 9.69
    },
    "p2": {
      "x": 78.35,
      "y": 82.29
    },
    "text": "410mm"
  },
  "width": {
    "p1": {
      "x": 24.54,
      "y": 84.58
    },
    "p2": {
      "x": 63.8,
      "y": 90.56
    },
    "text": "730mm"
  }
};

const initialSpecLines = {
  "line1": {
    "anchor": { "x": 29.25, "y": 29.68 },
    "end": { "x": 10.97, "y": 13.13 },
    "textPos": { "x": 82.06, "y": 11.07, "align": "left" }
  },
  "line2": {
    "anchor": { "x": 28.8, "y": 38.85 },
    "end": { "x": 15, "y": 50 },
    "textPos": { "x": -7.29, "y": 52.65, "align": "left" }
  },
  "line3": {
    "anchor": { "x": 28.6, "y": 63.13 },
    "end": { "x": 14.68, "y": 84.13 },
    "textPos": { "x": 3.35, "y": 98.14, "align": "left" }
  },
  "line4": {
    "anchor": { "x": 60.77, "y": 21.63 },
    "end": { "x": 82.26, "y": 11.3 },
    "textPos": { "x": 10.97, "y": 12.44, "align": "right" }
  },
  "line5": {
    "anchor": { "x": 73.67, "y": 45.76 },
    "end": { "x": 85, "y": 65 },
    "textPos": { "x": 101.2, "y": 83.67, "align": "right" }
  }
};

const DraggablePoint = ({ position, onMouseDown, isDragged }) => (
  <div
    onMouseDown={onMouseDown}
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
    className={cn(
      "absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary cursor-grab",
      isDragged ? "cursor-grabbing ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
    )}
  />
);

const StaticPoint = ({ position }) => (
  <div
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
    className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/20 border border-primary"
  />
);

export const SpecsSection = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("specs");
  const [specLines, setSpecLines] = useState(initialSpecLines);
  const [metricLines, setMetricLines] = useState(initialMetricLines);
  const [draggedPoint, setDraggedPoint] = useState(null);
  const containerRef = useRef(null);

  const features = [
    { title: t('homePage.specs.step1_title'), description: t('homePage.specs.step1_desc') },
    { title: t('homePage.specs.step2_title'), description: t('homePage.specs.step2_desc') },
    { title: t('homePage.specs.step3_title'), description: t('homePage.specs.step3_desc') },
    { title: t('homePage.specs.step4_title'), description: t('homePage.specs.step4_desc') },
    { title: t('homePage.specs.step5_title'), description: t('homePage.specs.step5_desc') },
  ];
  
  const mobileMetrics = [
    { title: t('homePage.specs.metrics.height'), value: "410mm" },
    { title: t('homePage.specs.metrics.width'), value: "730mm" },
    { title: t('homePage.specs.metrics.depth'), value: "222mm" },
  ];

  const handleMouseDown = (e, type, key, point) => {
    e.preventDefault();
    setDraggedPoint({ type, key, point });
  };

  const handleMouseUp = useCallback(() => {
    setDraggedPoint(null);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!draggedPoint || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width * 100).toFixed(2));
    const y = parseFloat(((e.clientY - rect.top) / rect.height * 100).toFixed(2));

    const { type, key, point } = draggedPoint;

    if (type === 'metrics') {
      setMetricLines(prev => ({
        ...prev,
        [key]: { ...prev[key], [point]: { ...prev[key][point], x, y } }
      }));
    }
  }, [draggedPoint]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const copyCoordinates = () => {
    const coords = viewMode === 'specs' ? specLines : metricLines;
    navigator.clipboard.writeText(JSON.stringify(coords, null, 2));
    showSuccess("Coordinates copied to clipboard!");
  };

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
          <Button onClick={copyCoordinates} variant="outline" size="sm" className="hidden md:inline-flex">Copy Coordinates</Button>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="relative w-full max-w-5xl mx-auto" ref={containerRef}>
            <img 
              src="/fragrance-machine-specs.png" 
              alt="Fragrance Vending Machine" 
              className="w-full max-w-4xl h-auto rounded-lg mx-auto pointer-events-none" 
            />
            
            {viewMode === 'specs' && (
              <div className="absolute inset-0">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                  {Object.values(specLines).map((line, index) => (
                    <line key={index} x1={`${line.anchor.x}%`} y1={`${line.anchor.y}%`} x2={`${line.end.x}%`} y2={`${line.end.y}%`} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-foreground/30" />
                  ))}
                </svg>
                {Object.entries(specLines).map(([key, line], index) => (
                  <React.Fragment key={key}>
                    <div
                      style={{
                        position: 'absolute', left: `${line.textPos.x}%`, top: `${line.textPos.y}%`,
                        transform: line.textPos.align === 'left' ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
                        backgroundColor: 'hsl(var(--background) / 0.8)', padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius)', width: '220px',
                        textAlign: line.textPos.align === 'left' ? 'left' : 'right',
                      }}
                    >
                      <h4 className="font-bold text-sm mb-1 pointer-events-none">{features[index]?.title}</h4>
                      <p className="text-xs text-foreground/80 whitespace-normal pointer-events-none">{features[index]?.description}</p>
                    </div>
                    <StaticPoint position={line.anchor} />
                    <StaticPoint position={line.end} />
                  </React.Fragment>
                ))}
              </div>
            )}

            {viewMode === 'metrics' && (
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
                    pointerEvents: 'none'
                  };
                  return (
                    <React.Fragment key={key}>
                      <p style={textStyle}>{line.text}</p>
                      <DraggablePoint position={line.p1} onMouseDown={(e) => handleMouseDown(e, 'metrics', key, 'p1')} isDragged={draggedPoint?.key === key && draggedPoint?.point === 'p1'} />
                      <DraggablePoint position={line.p2} onMouseDown={(e) => handleMouseDown(e, 'metrics', key, 'p2')} isDragged={draggedPoint?.key === key && draggedPoint?.point === 'p2'} />
                    </React.Fragment>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden mt-12">
          {viewMode === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card/50">
                  <h3 className="font-bold text-lg text-center">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm text-center mt-2">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
          {viewMode === 'metrics' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {mobileMetrics.map((metric, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card/50 text-center">
                  <h3 className="font-bold text-lg">{metric.title}</h3>
                  <p className="text-2xl text-primary font-semibold mt-2">{metric.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};