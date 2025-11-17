import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container max-w-screen-2xl py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/Fragancao-Logo-TEXT-TRANSPARANT.png" 
              alt="Fragancao Logo" 
              className="h-6 w-auto"
            />
          </Link>
          <p className="text-foreground/60">
            {t('footer.tagline')}
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-foreground/60 hover:text-foreground" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-foreground/60 hover:text-foreground" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-foreground/60 hover:text-foreground" /></a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">{t('footer.navigation')}</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-foreground/60 hover:text-foreground">{t('header.home')}</Link></li>
            <li><Link to="/pricing" className="text-foreground/60 hover:text-foreground">{t('header.pricing')}</Link></li>
            <li><Link to="/contact" className="text-foreground/60 hover:text-foreground">{t('header.contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">{t('footer.stayUpdated')}</h3>
          <p className="text-foreground/60 mb-4">
            {t('footer.newsletterPrompt')}
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input type="email" placeholder={t('footer.emailPlaceholder')} />
            <Button type="submit">{t('footer.subscribe')}</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/40 py-6">
        <p className="text-center text-sm text-foreground/60">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;