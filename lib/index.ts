/**
 * A lightweight internationalization plugin for Vue.js
 *
 * @version 3.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

export interface i18nJSON {
  [key: string]: string | undefined
}

export interface i18nTranslation {
  [lang: string]: i18nJSON | undefined
}

export interface i18nParameters {
  locale: string,
  tokens?: string[],
  count?: number
}

export interface i18nOptions {
  default: string,
  locales: i18nTranslation
}

const _LOCALEKEY_: string = 'locale'
var _TRANSLATIONS_: i18nTranslation = {}
var _SUPPORTED_LOCALES_: string[] = ['en']

function _getLocale(): string {
  const defaultLocale: string = 'en'
  var storageLocale: any = localStorage.getItem(_LOCALEKEY_)

  var locale = storageLocale || window.navigator.language || defaultLocale
  if (locale.length > 2) {
    locale = locale.substr(0, 2)
  }

  if (_SUPPORTED_LOCALES_.indexOf(locale) > -1) {
    localStorage.setItem(_LOCALEKEY_, locale)
    return locale
  }

  localStorage.setItem(_LOCALEKEY_, defaultLocale)
  return defaultLocale
}

function _setLocale(locale: string): void {
  localStorage.removeItem(_LOCALEKEY_)
  if (locale.length > 0) {
    localStorage.setItem(_LOCALEKEY_, locale)
  }
}

function _addTranslation(locale: string, translation?: i18nJSON) {
  if (!locale.length) {
    return
  }
  _SUPPORTED_LOCALES_.push(locale)
  _TRANSLATIONS_[locale] = translation
}

function _translate(message: string, params?: i18nParameters) {
  const locale = params ?.locale ?? _getLocale()
  const translation = _TRANSLATIONS_[locale]
  if (translation === undefined) {
    return message
  }

  const tokens = params ?.tokens ?? []
  var output = translation[message] ?? message
  if (output.indexOf('|') > -1) {
    const count = params ?.count ?? 0
    const parts = output.split('|')
    if (parts.length) {
      output = count < parts.length ? parts[count].trim() : parts[parts.length - 1].trim()
    }
  }
  for (let i = 0; i < tokens.length; i++) {
    output = output.replace(/%s/u, tokens[i])
  }
  return output
}

const _i18n = {
  getLocale: _getLocale,
  setLocale: _setLocale
}

const _plugin = {
  install: (app: any, options?: i18nOptions) => {
    app.provide('i18n', _i18n)
    var locales = options ?.locales ?? {}
    for (const key in locales) {
      _addTranslation(key, locales[key])
    }
    _setLocale(options ?.default ?? '')
    app.config.globalProperties.$tr = _translate
  }
}

export type i18nInstance = typeof _i18n

export {
  _translate as tr,
  _i18n as i18n,
  _plugin as plugin
}
