import React from 'react';
import { useVersion } from '@/context/VersionContext';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const VersionSwitcher = () => {
  const { version, setVersion } = useVersion();

  const isBeta = version === 'beta';

  const handleSwitch = (checked: boolean) => {
    setVersion(checked ? 'beta' : 'legacy');
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="version-switch" className={!isBeta ? 'text-primary' : 'text-muted-foreground'}>
        Legacy
      </Label>
      <Switch
        id="version-switch"
        checked={isBeta}
        onCheckedChange={handleSwitch}
      />
      <Label htmlFor="version-switch" className={isBeta ? 'text-primary' : 'text-muted-foreground'}>
        Beta
      </Label>
    </div>
  );
};