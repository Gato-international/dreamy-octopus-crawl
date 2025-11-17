import { useTranslation } from "react-i18next";

export const SpecsSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('homePage.specs.touchscreen'),
      description: t('homePage.specs.touchscreenDesc'),
      textPosition: { top: '25%', left: '0%' },
      linePoints: { x1: '12%', y1: '30%', x2: '22%', y2: '35%' },
      textAlignment: 'text-left'
    },
    {
      title: t('homePage.specs.payment'),
      description: t('homePage.specs.paymentDesc'),
      textPosition: { top: '65%', left: '0%' },
      linePoints: { x1: '12%', y1: '70%', x2: '22%', y2: '75%' },
      textAlignment: 'text-left'
    },
    {
      title: t('homePage.specs.slots'),
      description: t('homePage.specs.slotsDesc'),
      textPosition: { top: '25%', right: '0%' },
      linePoints: { x1: '88%', y1: '30%', x2: '65%', y2: '35%' },
      textAlignment: 'text-right'
    },
    {
      title: t('homePage.specs.outlets'),
      description: t('homePage.specs.outletsDesc'),
      textPosition: { top: '75%', right: '0%' },
      linePoints: { x1: '88%', y1: '80%', x2: '70%', y2: '88%' },
      textAlignment: 'text-right'
    },
  ];

  const mobileFeatures = [
    { title: t('homePage.specs.touchscreen'), description: t('homePage.specs.touchscreenDesc') },
    { title: t('homePage.specs.payment'), description: t('homePage.specs.paymentDesc') },
    { title: t('homePage.specs.slots'), description: t('homePage.specs.slotsDesc') },
    { title: t('homePage.specs.outlets'), description: t('homePage.specs.outletsDesc') },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 font-heading">
            {t('homePage.specs.title')}
          </h2>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <img
            src="/fragrance-machine-specs.png"
            alt="Fragrance Vending Machine Features"
            className="w-full h-auto rounded-lg"
          />
          
          <div className="absolute inset-0 hidden md:block">
            <svg width="100%" height="100%" className="overflow-visible">
              {features.map((feature, index) => (
                <g key={index}>
                  <line 
                    x1={feature.linePoints.x1} 
                    y1={feature.linePoints.y1} 
                    x2={feature.linePoints.x2} 
                    y2={feature.linePoints.y2} 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                    opacity="0.7"
                  />
                  <circle 
                    cx={feature.linePoints.x2} 
                    cy={feature.linePoints.y2} 
                    r="8" 
                    fill="hsl(var(--primary))"
                    className="opacity-30"
                  />
                   <circle 
                    cx={feature.linePoints.x2} 
                    cy={feature.linePoints.y2} 
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