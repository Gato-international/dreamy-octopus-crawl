import React from 'react';
import { useVersion } from '@/context/VersionContext';
import LegacyIndex from './LegacyIndex';
import BetaIndex from './BetaIndex';

const Index = () => {
  const { version } = useVersion();

  if (version === 'legacy') {
    return <LegacyIndex />;
  }

  return <BetaIndex />;
};

export default Index;