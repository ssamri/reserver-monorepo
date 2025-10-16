'use client';

import { ReactNode, useEffect } from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { resources } from './translations';

let initialized = false;

function ensureInit() {
  if (initialized) {
    return;
  }

  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'fr',
      defaultNS: 'common',
      supportedLngs: ['fr', 'en', 'es', 'ar'],
      interpolation: { escapeValue: false }
    })
    .catch((error) => console.error('i18n init error', error));

  initialized = true;
}

export function ClientI18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureInit();
  }, []);

  ensureInit();

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
