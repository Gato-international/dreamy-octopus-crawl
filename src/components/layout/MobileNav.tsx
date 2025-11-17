import { Dock } from "@/components/ui/dock-two";
import { Home, Tag, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const MobileNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const items = [
    { icon: Home, label: t('header.home'), onClick: () => navigate('/') },
    { icon: Tag, label: t('header.pricing'), onClick: () => navigate('/pricing') },
    { icon: Mail, label: t('header.contact'), onClick: () => navigate('/contact') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <Dock items={items} />
    </div>
  );
};