import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translations.json';
import es from './locales/es/translations.json';
import pt from './locales/pt/translations.json';
import it from './locales/it/translations.json';
import fr from './locales/fr/translations.json';
import cn from './locales/cn/translations.json';

// Configuración básica
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // Importante para React Native
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
    it: { translation: it },
    fr: { translation: fr },
    cn: { translation: cn },
  },
  lng: 'en', // Idioma por defecto
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React Native ya escapa por defecto
  },
});

export default i18n;
