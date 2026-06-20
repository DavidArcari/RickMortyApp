import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {resources} from './resources';

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
}).catch(() => undefined);

export default i18n;
