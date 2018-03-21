# :globe_with_meridians: vue-i18nt

A simple internationalization plugin for Vue.js

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

Load any locale variable with a json file for translations

```javascript
Vue.i18n.add('fr', require('./assets/locale/fr.json'))
```

The json must an array of simple objects containing pairs of source / target like:

```javascript
;[
  {
    source: 'my translated line',
    target: 'ma ligne de traduction'
  }
]
```

You can use the directive 'translate' in your html template

```javascript
<template>
  <div>
    <p>{{ 'my translated line' | translate }}</p>
  </div>
</template>
```

Or, use the global function this.$i18n.tr in your script

```javascript
...
var myTr = this.$i18n.tr('my translated line')
console.log('Translating: ' + myTr)
// Translating: ma ligne de traduction
...
```

## License

[MIT](http://opensource.org/licenses/MIT)
