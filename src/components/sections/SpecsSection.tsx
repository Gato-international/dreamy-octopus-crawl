import { useTranslation } from "react-i18next";
import React, { useState, useRef } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { showSuccess } from "@/utils/toast";

// Initial coordinates from the last static version
const initialMetricLines = {
  depth: { p1: { x: 66.24, y: 85.94 }, p2: { x: 75.51, y: 83.92 }, text: "222mm" },
  height: { p1: { x: 78.35, y: 14.17 }, p2: { x: 78.35, y: 78.90 }, text: "410mm" },
  width: { p1: { x: 24.54, y: 80.31 }, p2: { x: 64.00, y: 86.14 }, text: "730mm" },
};

const initialSpecLines = {
  line1: { anchor: { x: 29.25, y: 29.68 }, end: { x: 15, y: 20 }, textPos: { x: 3, y: 20, align: 'left' } },
  line2: { anchor: { x: 28.80, y: 38.85 }, end: { x: 15, y: 50 }, textPos: { x: 3, y: 50, align: 'left' } },
  line3: { anchor: { x: 28.60, y: 63.13 }, end: { x: 15, y: 80 }, textPos: { x: 3, y: 80, align: 'left' } },
  line4: { anchor: { x: 62.33, y: 44.39 }, end: { x: 85, y: 35 }, textPos: { x: 97, y: 35, align: 'right' } },
  line5: { anchor: { x: 62.46, y: 70.41 }, end: { x: 85, y: 65 }, textPos: { x: 97, y: 65, align: 'right' } },
};

const DraggablePoint = ({ onMouseDown, position, className = "bg-primary" }: { onMouseDown: (e: React.MouseEvent) => void, position: { x: number, y: number }, className?: string }) => (
  <div
    onMouseDown={onMouseDown}
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
    className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-move border-2 border-background ${className}`}
  />
);

export const SpecsSection = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("specs");

  const [metricLines, setMetricLines] = useState(initialMetricLines);
  const [specLines, setSpecLines] = useState(initialSpecLines);
  const [dragTarget, setDragTarget] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = (e: React.MouseEvent, type: string, key: string, point: string) => {
    e.preventDefault();
    setDragTarget({ type, key, point });
  };

  const handleMouseUp = () => {
    setDragTarget(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragTarget || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width * 100).toFixed(2));
    const y = parseFloat(((e.clientY - rect.top) / rect.height * 100).toFixed(2));

    const { type, key, point } = dragTarget;

    if (type === 'spec') {
      setSpecLines(prev => ({
        ...prev,
        [key]: { ...prev[key], [point]: { ...prev[key][point], x, y } }
      }));
    } else if (type === 'metric') {
      setMetricLines(prev => ({
        ...prev,
        [key]: { ...prev[key], [point]: { x, y } }
      }));
    }
  };

  const copyCoordinatesToClipboard = () => {
    const jsonString = `const initialMetricLines = ${JSON.stringify(metricLines, null, 2)};\n\nconst initialSpecLines = ${JSON.stringify(specLines, null, 2)};`;
    navigator.clipboard.writeText(jsonString);
    showSuccess("Coordinates copied to clipboard!");
    console.log(jsonString);
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
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full max-w-5xl mx-auto select-none"
          >
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
                    <DraggablePoint onMouseDown={(e) => handleMouseDown(e, 'spec', key, 'anchor')} position={line.anchor} />
                    <DraggablePoint onMouseDown={(e) => handleMouseDown(e, 'spec', key, 'end')} position={line.end} className="bg-foreground/50" />
                    <div
                      onMouseDown={(e) => handleMouseDown(e, 'spec', key, 'textPos')}
                      style={{
                        position: 'absolute',
                        left: `${line.textPos.x}%`,
                        top: `${line.textPos.y}%`,
                        transform: line.textPos.align === 'left' ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
                        backgroundColor: 'hsl(var(--background) / 0.8)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius)',
                        cursor: 'move',
                        width: '220px',
                        textAlign: line.textPos.align === 'left' ? 'left' : 'right',
                      }}
                    >
                      <h4 className="font-bold text-sm mb-1 pointer-events-none">{features[index]?.title}</h4>
                      <p className="text-xs text-foreground/80 whitespace-normal pointer-events-none">{features[index]?.description}</p>
                    </div>
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
                      <DraggablePoint onMouseDown={(e) => handleMouseDown(e, 'metric', key, 'p1')} position={line.p1} />
                      <DraggablePoint onMouseDown={(e) => handleMouseDown(e, 'metric', key, 'p2')} position={line.p2} />
                      <p style={textStyle}>{line.text}</p>
                    </React.Fragment>
                  )
                })}
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Button onClick={copyCoordinatesToClipboard}>
              <Clipboard className="w-4 h-4 mr-2" />
              Copy Coordinates
            </Button>
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