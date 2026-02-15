import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import es from '../locales/es.json';

export type Locale = 'es' | 'en';

const resources = {
  en: { translation: en as Record<string, string> },
  es: { translation: es as Record<string, string> },
};

// eslint-disable-next-line import/no-named-as-default-member -- i18n.use() is the plugin API, not the named export
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
