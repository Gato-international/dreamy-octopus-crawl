import { useState, useEffect } from 'react';
import { ShaderAnimation } from '@/components/ui/shader-lines';
import { cn } from '@/lib/utils';

interface LoaderProps {
  onLoaded: () => void;
}

export const Loader = ({ onLoaded }: LoaderProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 3 seconds
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3000);

    // Call the onLoaded callback after the fade-out transition is complete
    const fadeOutTimer = setTimeout(() => {
      onLoaded();
    }, 3500); // 3000ms for display + 500ms for fade-out

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
    };
  }, [onLoaded]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500',
        isFadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <ShaderAnimation />
      <img
        src="/Fragancao-Logo-TEXT-TRANSPARANT.png"
        alt="Fragancao Logo"
        className="relative z-10 w-48 sm:w-64 h-auto animate-pulse"
      />
    </div>
  );
};