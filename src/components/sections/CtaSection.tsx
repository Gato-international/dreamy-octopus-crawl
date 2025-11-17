import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CtaSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/contact">{t('homePage.cta.button1')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/pricing">{t('homePage.cta.button2')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};