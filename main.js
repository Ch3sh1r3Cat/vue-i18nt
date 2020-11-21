/**
 * A lightweight internationalization plugin for Vue.js
 *
 * @version 3.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

const _LOCALEKEY_ = 'locale'
var _TRANSLATIONS_ = {}
var _SUPPORTED_LOCALES_ = ['en']

function _has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

function _getLocale() {
  const defaultLocale = 'en'
  var storageLocale = localStorage.getItem(_LOCALEKEY_)

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

function _setLocale(locale) {
  localStorage.removeItem(_LOCALEKEY_)
  if (typeof locale === 'string' && locale.length) {
    localStorage.setItem(_LOCALEKEY_, locale)
  }
}

function _addTranslation(locale, translation) {
  if (typeof locale === 'string' && locale.length) {
    _SUPPORTED_LOCALES_.push(locale)
    _TRANSLATIONS_[locale] = translation
  }
}

function _translate(message, args) {
  if (!args || typeof args !== 'object') args = {}
  const locale = args.locale ? args.locale : _getLocale()
  if (_has(_TRANSLATIONS_, locale)) {
    const translation = _TRANSLATIONS_[locale]
    if (_has(translation, message)) {
      const tokens = args.tokens ? (args.tokens || []) : []
      var output = translation[message]
      for (let i = 0; i < tokens.length; i++) {
        output = output.replace(/%s/u, tokens[i])
      }
      if (output.indexOf('|') > 0) {
        const count = args.count ? args.count : 0
        const parts = output.split('|')
        if (parts.length) {
          return count < parts.length ? parts[count].trim() : parts[parts.length - 1].trim()
        }
      }
      return output
    }
  }
  return message
}

const _i18n = {
  getLocale: _getLocale,
  setLocale: _setLocale
}

const _plugin = {
  install: (app, options) => {
    app.provide('i18n', _i18n)
    if (!options || typeof options !== 'object') options = {}
    var locales = options.locales || {}
    for (const key in locales) {
      _addTranslation(key, locales[key])
    }
    if (_has(options, 'default')) {
      _setLocale(options.default)
    }
    app.config.globalProperties.$tr = _translate
  }
}

export {
  _translate as tr,
  _i18n as i18n,
  _plugin as plugin
}
