/**
 * A lightweight internationalization plugin for Vue.js
 *
 * @version 0.3.1
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

var _localeKey = 'locale';
var __translations = {};
var __supportedLocales = ['en'];

function __getLocale() {
  if (localStorage.getItem(_localeKey)) {
    var storage = localStorage.getItem(_localeKey);
    if (storage.length > 2) {
      storage = storage.substr(0, 2);
    }
    if (__supportedLocales.indexOf(storage) > -1) {
      return storage;
    }
  }

  var defaultLang = __supportedLocales[0];

  var language = window.navigator.language || defaultLang;
  if (language.length > 2) {
    language = language.substr(0, 2);
  }

  if (__supportedLocales.indexOf(language) > -1) {
    localStorage.setItem(_localeKey, language);
    return language;
  }

  localStorage.setItem(_localeKey, defaultLang);
  return language;
}

function __setLocale(locale) {
  localStorage.setItem(_localeKey, locale);
}

function __addTranslation(lang, translation) {
  __supportedLocales.push(lang);
  __translations[lang] = translation;
}

function __translate(source, locale) {
  var lang = locale ? locale : __getLocale();
  var translation = __translations[lang];
  if (translation) {
    for (var i = 0; i < translation.length; i++) {
      var element = translation[i];
      if (element.input === source) {
        return element.output;
      }
    }
  }
  return source;
}

export default {
  install: function install(Vue, options) {
    if (options && options.default) {
      __supportedLocales = [options.default];
    }

    Vue.i18n = {
      add: __addTranslation,
      tr: __translate,
      getLocale: __getLocale,
      setLocale: __setLocale
    };

    Vue.prototype.$i18n = {
      tr: __translate,
      getLocale: __getLocale,
      setLocale: __setLocale
    };

    Vue.filter('translate', __translate);
  }
};
