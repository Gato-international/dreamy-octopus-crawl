import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export const CookieBanner = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary text-secondary-foreground p-4 shadow-lg animate-slide-in-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Cookie className="h-8 w-8 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <p className="text-sm">{t('cookieBanner.message')}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button onClick={handleAccept} size="sm">{t('cookieBanner.accept')}</Button>
          <Button onClick={handleDecline} variant="outline" size="sm">{t('cookieBanner.decline')}</Button>
        </div>
      </div>
    </div>
  );
};