"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../i18n/en';
import { ta } from '../i18n/ta';

type Language = 'en' | 'ta';
type Dictionary = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { useRouter } from 'next/navigation';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage on mount
    const saved = localStorage.getItem('ayalam_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ta')) {
      setLanguageState(saved);
      // Ensure cookie is in sync on mount
      document.cookie = `ayalam_lang=${saved}; path=/; max-age=31536000`;
    }
    setMounted(true);
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ayalam_lang', lang);
    document.cookie = `ayalam_lang=${lang}; path=/; max-age=31536000`;
    
    // Refresh Server Components so they re-fetch with the new language cookie
    router.refresh();
  };

  const t = language === 'ta' ? ta : en;

  // Prevent hydration mismatch by rendering children only after mounting
  if (!mounted) return <>{children}</>;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default English context if used outside provider (e.g. server components during SSR)
    return { language: 'en' as Language, setLanguage: () => {}, t: en };
  }
  return context;
};
