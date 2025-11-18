import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { DockIconButton } from "@/components/ui/dock-two";

export const DockLanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DockIconButton icon={Globe} label="Language" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="top" className="mb-2">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("nl")}>
          Dutch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};