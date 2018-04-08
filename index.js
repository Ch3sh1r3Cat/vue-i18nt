/**
 * @license
 * Copyright (c) 2018 Charles-André LEDUC. All rights reserved.
 */

var i18n = {
  install: function install(Vue, options) {
    var localeKey = 'locale';
    var translations = {};

    var supportedLocales = ['en'];
    if (options) {
      if (options.default) {
        supportedLocales = [options.default];
      }
    }

    var translate = function translate(source) {
      var locale = getLocale();
      var translation = translations[locale];
      if (translation != null) {
        for (var index in translation) {
          var element = translation[index];
          if (element.source === source) {
            return element.target;
          }
        }
      }
      return source;
    };

    var addTranslation = function addTranslation(lang, translation) {
      supportedLocales.push(lang);
      translations[lang] = translation;
    };

    var getLocale = function getLocale() {
      if (localStorage.getItem(localeKey)) {
        var storage = localStorage.getItem(localeKey);
        if (storage.length > 2) {
          storage = storage.substr(0, 2);
        }
        return storage;
      }

      var defaultLang = supportedLocales[0];

      var language = window.navigator.language || defaultLang;
      if (language.length > 2) {
        language = language.substr(0, 2);
      }

      if (supportedLocales.indexOf(language) > -1) {
        localStorage.setItem(localeKey, language);
        return language;
      }

      localStorage.setItem(localeKey, defaultLang);
      return language;
    };

    var setLocale = function setLocale(locale) {
      localStorage.setItem(localeKey, locale);
    };

    Vue.i18n = {
      setLocale: setLocale,
      add: addTranslation
    };

    Vue.prototype.$i18n = {
      tr: translate,
      getLocale: getLocale
    };

    Vue.filter('translate', translate);
  }
};

export default i18n;
