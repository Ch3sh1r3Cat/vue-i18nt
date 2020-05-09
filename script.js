/**
 * A lightweight internationalization plugin for Vue.js
 *
 * @version 0.2.1
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

export default {
  install(Vue, options) {
    const _localeKey = 'locale'
    var _translations = {}

    var supportedLocales = ['en']
    if (options && options.default) {
      supportedLocales = [options.default]
    }

    var translate = function(source, locale) {
      var lang = locale ? locale : getLocale()
      const translation = _translations[lang]
      if (translation) {
        for (var i = 0; i < translation.length; i++) {
          var element = translation[i];
          if (element.input === source) {
            return element.output;
          }
        }
      }
      return source
    }

    var addTranslation = function(lang, translation) {
      supportedLocales.push(lang)
      _translations[lang] = translation
    }

    var getLocale = function() {
      if (localStorage.getItem(_localeKey)) {
        var storage = localStorage.getItem(_localeKey)
        if (storage.length > 2) {
          storage = storage.substr(0, 2)
        }
        return storage
      }

      const defaultLang = supportedLocales[0]

      var language = window.navigator.language || defaultLang
      if (language.length > 2) {
        language = language.substr(0, 2)
      }

      if (supportedLocales.indexOf(language) > -1) {
        localStorage.setItem(_localeKey, language)
        return language
      }

      localStorage.setItem(_localeKey, defaultLang)
      return language
    }

    var setLocale = function(locale) {
      localStorage.setItem(_localeKey, locale)
    }

    Vue.i18n = {
      setLocale: setLocale,
      add: addTranslation
    }

    Vue.prototype.$i18n = {
      tr: translate,
      getLocale: getLocale
    }

    Vue.filter('translate', translate)
  }
}
