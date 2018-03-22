# :globe_with_meridians: vue-i18nt

A lightweight internationalization plugin for Vue.js

## Installation

```javascript
npm install vue-i18nt --save
```

## How to use

Default use in your main.js Vue project

```javascript
import i18n from 'vue-i18nt'

Vue.use(i18n)
```

You can pass an optional object for default supported locale

```javascript
Vue.use(i18n, { default: 'en' })
```

Load any locale variable with a JSON file for translations

```javascript
Vue.i18n.add('fr', require('./assets/locale/fr.json'))
```

The JSON must be an array of simple objects containing pairs of source / target, like:

```javascript
;[
  {
    source: 'Translated into French',
    target: 'Traduit en français'
  }
]
```

You can use the directive 'translate' in your HTML template

```javascript
<template>
  <div>
    <p>{{ 'Translated into French' | translate }}</p>
  </div>
</template>
```

Or, use the instance methods 'this.$i18n.tr' in your Vue script

```javascript
...
var myTr = this.$i18n.tr('Translated into French')
console.log('Translating: ' + myTr)
// Translating: Traduit en français
...
```

## License

[MIT](http://opensource.org/licenses/MIT)
