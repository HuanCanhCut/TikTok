import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import VI from './locales/vi/translate.json'
import EN from './locales/en/translate.json'

const resources = {
    en: {
        translation: EN,
    },
    vi: {
        translation: VI,
    },
}

const currentLang = JSON.parse(localStorage.getItem('currentLanguage')!) ?? 'en'

i18n.use(initReactI18next).init({
    resources,
    lng: currentLang,
    ns: ['translation'],
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // React already does escaping
    },
})
