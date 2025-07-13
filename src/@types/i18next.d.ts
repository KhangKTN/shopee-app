import 'i18next'
import { defaultNS, resources } from '~/i18n'

declare module 'i18next' {
    // Extend
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS
        resources: (typeof resources)['vi']
    }
}
