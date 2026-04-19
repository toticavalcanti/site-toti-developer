'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ProjectType } from './qualification-schema';

type QualificationContextValue = {
  isOpen: boolean;
  defaultProjectType: ProjectType | null;
  source: string | null;
  open: (defaultProjectType?: ProjectType, source?: string) => void;
  close: () => void;
};

const QualificationContext = createContext<QualificationContextValue | null>(null);

export function QualificationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProjectType, setDefaultProjectType] = useState<ProjectType | null>(null);
  const [source, setSource] = useState<string | null>(null);

  const open = useCallback((type?: ProjectType, source?: string) => {
    setDefaultProjectType(type ?? null);
    setSource(source ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setDefaultProjectType(null);
    setSource(null);
  }, []);

  return (
    <QualificationContext.Provider value={{ isOpen, defaultProjectType, source, open, close }}>
      {children}
    </QualificationContext.Provider>
  );
}

export function useQualification() {
  const ctx = useContext(QualificationContext);
  if (!ctx) throw new Error('useQualification must be used inside <QualificationProvider>');
  return ctx;
}
