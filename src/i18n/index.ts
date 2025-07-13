import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '~/locales/en/home.json'
import PRODUCT_EN from '~/locales/en/product.json'
import HOME_VI from '~/locales/vi/home.json'
import PRODUCT_VI from '~/locales/vi/product.json'

export const locales = {
    en: 'English',
    vi: 'Tiếng Việt'
} as const

export const resources = {
    vi: {
        home: HOME_VI,
        product: PRODUCT_VI
    },
    en: {
        home: HOME_EN,
        product: PRODUCT_EN
    }
} as const

export const defaultNS = 'home' as const

i18next.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    ns: ['home', 'product'],
    defaultNS,
    interpolation: {
        escapeValue: false // React already safe from xss
    }
})
