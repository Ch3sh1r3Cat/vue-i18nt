# vue-i18nt

A lightweight internationalization plugin for Vue.js with Typescript support

## Installation

```javascript
npm install vue-i18nt --save
```

## How to use

Default use in your main.js Vue project

```typescript
import * as i18nt from 'vue-i18nt'
...
createApp(App)
  .use(i18nt.plugin)
...
```

You can pass an optional object for options

```javascript
createApp(App)
  .use(i18nt.plugin, {
    default: 'en', // force default locale to 'en'
    locales: {
      en: require('./assets/locales/en.json'),
      fr: require('./assets/locales/fr.json')
    }
  })
```

The JSON files consist of key-value pairs where the key is the first argument passed to the main translation function, like:

```javascript
/* json */
{
  "msg1": "Message traduit en français",
  "msg2": "Ceci est un autre message",
  "greetings": "Bonjour!"
}
```

## Basic usage

You can use the $tr translation function injected with the i18nt plugin to localize texts in the HTML template Vue file

```javascript
<template>
  <div>
    <p>{{ $tr('msg1') }}</p>
  </div>
</template>
```

The result would be translated in the browser:

```html
<div>
  <p>Message traduit en français</p>
</div>
```

## Advanced usage

You can pass an optional object with the following properties:
- `locale`: to translate to the locale parameter
- `tokens`: an array to replace the %s token with the indexed string
- `count`: a Number to output a specific translated count

### Interpolation

The i18nt plugin supports string interpolation, with `%s` as placeholder in your translation files

```javascript
<template>
  <div>
    <p>{{ $tr('greetings', { locale: 'en', tokens: ['Vue'] }) }}</p>
  </div>
</template>
```

```javascript
/* json */
{
  "greetings": "Hello %s !"
}
```

It would be rendered in the browser:

```html
<div>
  <p>Hello Vue !</p>
</div>
```

### Pluralization

The i18nt plugin also supports pluralization, with `|` as a separator for none / one / many elements

```html
<template>
  <select>
    <option value="0">{{ $tr('crows', { count: 0 }) }}</option>
    <option value="1">{{ $tr('crows', { count: 1 }) }}</option>
    <option value="10">{{ $tr('crows', { count: 10 }) }}</option>
  </select>
</template>
```

```javascript
{
  "crows": "None | A crow | Murder of Crows"
}
```

As a result:

```html
<select>
  <option value="0">None</option>
  <option value="1">A crow</option>
  <option value="10">Murder of Crows</option>
</select>
```

## Provide / Inject

Plugin users will now be able to `inject['i18n']` into their components to access the i18n object with the following methods:
- `getLocale`: to access the global locale variable
- `setLocale`: to set the global locale variable

```javascript
export default {
  name: 'MyComponent',

  inject: ['i18n'],

  computed: {
    locale() {
      return this.i18n.getLocale()
    }
  },

  methods: {
    changeLanguage(lang) {
      this.i18n.setLocale(lang)
    }
  }
}
```

## Import

You can also import the `tr` from the exported module to use as a stand-alone function in other javascript files

```javascript
import { tr } from 'vue-i18nt'

var text = tr('msg2')
console.log('msg2 =>', text)
// msg2 => Ceci est un autre message
```

## License

[ISC](https://opensource.org/licenses/ISC)
