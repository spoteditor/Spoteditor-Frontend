import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './languages/en.json';
import ko from './languages/ko.json';

i18n
  .use(LanguageDetector) // 브라우저 언어 자동 감지
  .use(initReactI18next) // 리액트 연동
  .init({
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },
    fallbackLng: 'en', // 기본 언어
    interpolation: {
      escapeValue: false, // 리액트에선 false로 설정
    },
  });

export default i18n;
