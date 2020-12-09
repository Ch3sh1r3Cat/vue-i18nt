"use strict";
/**
 * A lightweight internationalization plugin for Vue.js
 *
 * @version 3.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.i18n = exports.tr = void 0;
var _LOCALEKEY_ = 'locale';
var _TRANSLATIONS_ = {};
var _SUPPORTED_LOCALES_ = ['en'];
function _getLocale() {
    var defaultLocale = 'en';
    var storageLocale = localStorage.getItem(_LOCALEKEY_);
    var locale = storageLocale || window.navigator.language || defaultLocale;
    if (locale.length > 2) {
        locale = locale.substr(0, 2);
    }
    if (_SUPPORTED_LOCALES_.indexOf(locale) > -1) {
        localStorage.setItem(_LOCALEKEY_, locale);
        return locale;
    }
    localStorage.setItem(_LOCALEKEY_, defaultLocale);
    return defaultLocale;
}
function _setLocale(locale) {
    localStorage.removeItem(_LOCALEKEY_);
    if (locale.length > 0) {
        localStorage.setItem(_LOCALEKEY_, locale);
    }
}
function _addTranslation(locale, translation) {
    if (!locale.length) {
        return;
    }
    _SUPPORTED_LOCALES_.push(locale);
    _TRANSLATIONS_[locale] = translation;
}
function _translate(message, params) {
    var _a, _b, _c, _d;
    var locale = (_a = params === null || params === void 0 ? void 0 : params.locale) !== null && _a !== void 0 ? _a : _getLocale();
    var translation = _TRANSLATIONS_[locale];
    if (translation === undefined) {
        return message;
    }
    var tokens = (_b = params === null || params === void 0 ? void 0 : params.tokens) !== null && _b !== void 0 ? _b : [];
    var output = (_c = translation[message]) !== null && _c !== void 0 ? _c : message;
    if (output.indexOf('|') > -1) {
        var count = (_d = params === null || params === void 0 ? void 0 : params.count) !== null && _d !== void 0 ? _d : 0;
        var parts = output.split('|');
        if (parts.length) {
            output = count < parts.length ? parts[count].trim() : parts[parts.length - 1].trim();
        }
    }
    for (var i = 0; i < tokens.length; i++) {
        output = output.replace(/%s/u, tokens[i]);
    }
    return output;
}
exports.tr = _translate;
var _i18n = {
    getLocale: _getLocale,
    setLocale: _setLocale
};
exports.i18n = _i18n;
var _plugin = {
    install: function (app, options) {
        var _a, _b;
        app.provide('i18n', _i18n);
        var locales = (_a = options === null || options === void 0 ? void 0 : options.locales) !== null && _a !== void 0 ? _a : {};
        for (var key in locales) {
            _addTranslation(key, locales[key]);
        }
        _setLocale((_b = options === null || options === void 0 ? void 0 : options.default) !== null && _b !== void 0 ? _b : '');
        app.config.globalProperties.$tr = _translate;
    }
};
exports.plugin = _plugin;
