import { useTranslation } from "react-i18next";

export const SpecsSection = () => {
  const { t } = useTranslation();

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
    // Right side - Reworked with Cubic Bézier curves
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