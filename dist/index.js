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
const _LOCALEKEY_ = 'locale';
var _TRANSLATIONS_ = {};
var _SUPPORTED_LOCALES_ = ['en'];
function _getLocale() {
    var _a;
    const defaultLocale = _SUPPORTED_LOCALES_[0];
    var storageLocale = localStorage.getItem(_LOCALEKEY_);
    var locale = (_a = storageLocale !== null && storageLocale !== void 0 ? storageLocale : window.navigator.language) !== null && _a !== void 0 ? _a : defaultLocale;
    if (locale === 'navigator') {
        locale = window.navigator.language;
    }
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
    if ((locale !== null && locale !== void 0 ? locale : '').length > 0) {
        localStorage.setItem(_LOCALEKEY_, locale !== null && locale !== void 0 ? locale : 'navigator');
    }
}
function _addTranslation(locale, translation) {
    if (!(locale !== null && locale !== void 0 ? locale : '').length) {
        return;
    }
    _SUPPORTED_LOCALES_.push(locale);
    _TRANSLATIONS_[locale] = translation;
}
function _translate(message, params) {
    var _a, _b, _c, _d, _e, _f;
    const locale = (_a = params === null || params === void 0 ? void 0 : params.locale) !== null && _a !== void 0 ? _a : _getLocale();
    const translation = _TRANSLATIONS_[locale];
    if (translation === undefined) {
        return message;
    }
    if ((params === null || params === void 0 ? void 0 : params.reversed) === true) {
        return (_b = Object.keys(translation).find((key) => translation[key] === message)) !== null && _b !== void 0 ? _b : message;
    }
    const tokens = (_c = params === null || params === void 0 ? void 0 : params.tokens) !== null && _c !== void 0 ? _c : [];
    var output = (_e = (_d = translation[message]) !== null && _d !== void 0 ? _d : message) !== null && _e !== void 0 ? _e : '';
    if ((output === null || output === void 0 ? void 0 : output.indexOf('|')) > -1) {
        const count = (_f = params === null || params === void 0 ? void 0 : params.count) !== null && _f !== void 0 ? _f : 0;
        const parts = output.split('|');
        if (parts.length) {
            output = count < parts.length ? parts[count].trim() : parts[parts.length - 1].trim();
        }
    }
    for (let i = 0; i < tokens.length; i++) {
        output = output.replace(/%s/u, tokens[i]);
    }
    return output;
}
exports.tr = _translate;
const _i18n = {
    getLocale: _getLocale,
    setLocale: _setLocale
};
exports.i18n = _i18n;
const _plugin = {
    install: (app, options) => {
        var _a, _b;
        app.provide('i18n', _i18n);
        var locales = (_a = options === null || options === void 0 ? void 0 : options.locales) !== null && _a !== void 0 ? _a : {};
        for (const key in locales) {
            _addTranslation(key, locales[key]);
        }
        _setLocale((_b = options === null || options === void 0 ? void 0 : options.default) !== null && _b !== void 0 ? _b : '');
        app.config.globalProperties.$tr = _translate;
    }
};
exports.plugin = _plugin;
