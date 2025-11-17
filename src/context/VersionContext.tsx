import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type Version = 'legacy' | 'beta';

interface VersionContextType {
  version: Version;
  setVersion: (version: Version) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const VersionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [version, setVersionState] = useState<Version>(() => {
    const paramVersion = searchParams.get('version');
    if (paramVersion === 'legacy' || paramVersion === 'beta') {
      return paramVersion;
    }
    return 'beta'; // Default to beta
  });

  const setVersion = (newVersion: Version) => {
    setVersionState(newVersion);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('version', newVersion);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const paramVersion = searchParams.get('version');
    if (!paramVersion) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('version', version);
      setSearchParams(newParams, { replace: true });
    } else if (paramVersion !== version) {
      setVersionState(paramVersion as Version);
    }
  }, [searchParams, version, setSearchParams]);


  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};