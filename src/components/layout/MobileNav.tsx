import { Dock } from "@/components/ui/dock-two";
import { Home, DollarSign, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DockLanguageSwitcher } from "@/components/DockLanguageSwitcher";

export const MobileNav = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items = [
    { 
      icon: Home, 
      label: t('header.home'),
      onClick: () => navigate('/') 
    },
    { 
      icon: DollarSign, 
      label: t('header.pricing'),
      onClick: () => navigate('/pricing') 
    },
    { 
      icon: Mail, 
      label: t('header.contact'),
      onClick: () => navigate('/contact') 
    },
    {
      label: "LanguageSwitcher",
      component: <DockLanguageSwitcher />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <Dock items={items} />
    </div>
  );
};