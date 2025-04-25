import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'AI Assistant': 'AI Assistant',
      'Ask me anything...': 'Ask me anything...',
    },
  },
  fr: {
    translation: {
      'AI Assistant': 'Assistant IA',
      'Ask me anything...': 'Posez-moi une question...',
    },
  },
  ar: {
    translation: {
      'AI Assistant': 'المساعد الذكي',
      'Ask me anything...': 'اسألني أي شيء...',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
