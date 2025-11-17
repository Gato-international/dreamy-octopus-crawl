import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MoveRight, PhoneCall } from "lucide-react";

function Hero() {
  const { t } = useTranslation();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => t('animatedHero.adjectives', { returnObjects: true }) as string[],
    [t]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex gap-8 items-center lg:items-start justify-center flex-col max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl tracking-tighter font-heading">
              {t('animatedHero.title')}
              <span className="relative block h-16 md:h-24">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute w-full left-0"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
              {t('animatedHero.description')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/contact">
                {t('animatedHero.requestConsultation')}
                <PhoneCall className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-2">
              <Link to="/pricing">
                {t('animatedHero.becomePartner')}
                <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };