import { ShieldCheck } from 'lucide-react';

export const SecurityBadge = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-foreground/50 mt-4">
      <ShieldCheck className="h-4 w-4 text-green-500" />
      <span>Enhanced Security by VOF tynk tech</span>
    </div>
  );
};