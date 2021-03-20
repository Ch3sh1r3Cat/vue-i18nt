/**
 * A lightweight internationalization plugin for Vue.js
 *
 * @version 3.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */
export interface i18nJSON {
    [key: string]: string | undefined;
}
export interface i18nTranslation {
    [lang: string]: i18nJSON | undefined;
}
export interface i18nParameters {
    locale: string;
    tokens?: string[];
    count?: number;
    reversed: boolean;
}
export interface i18nOptions {
    default: string;
    locales: i18nTranslation;
}
declare function _getLocale(): string;
declare function _setLocale(locale?: string | null): void;
declare function _translate(message: string, params?: i18nParameters): string;
declare const _i18n: {
    getLocale: typeof _getLocale;
    setLocale: typeof _setLocale;
};
declare const _plugin: {
    install: (app: any, options?: i18nOptions | undefined) => void;
};
export declare type i18nInstance = typeof _i18n;
export { _translate as tr, _i18n as i18n, _plugin as plugin };
