import spanish from "../../public/locales/es/common.json"
import english from "../../public/locales/en/common.json"

const languages = ['en', 'es'] as const
export const supportedLanguages = [...languages]

export const resources = {
    en: {
        translation: english
    },
    es: {
        translation: spanish
    }
}

declare module 'i18next' {
    export interface CustomTypeOptions {
        defaultNS: 'common'
        fallbackNS: 'common'
        resources: typeof resources
    }
}