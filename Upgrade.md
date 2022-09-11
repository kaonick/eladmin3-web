# vue2 to vue3 changelog:

## upgrade to element-plus
### el-subment change to el-sub-ment WTF!!!

### vite element-plus install
> <https://element-plus.gitee.io/en-US/guide/quickstart.html#on-demand-import>
> npm install -D unplugin-vue-components unplugin-auto-import
> vite add
```javascript
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```
### ThemePicker\index.vue
> \layout\index.vue
> \layout\components\Settings\index.

> url change
```javascript
        // const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        const url = `https://unpkg.com/browse/element-plus@${version}/theme-chalk/index.css`
```
> require not working
```javascript
// const version = require('element-ui/package.json').version // element-ui version from node_modules
const version = require('element-plus/package.json').version // element-ui version from node_modules

const version='2.2.16'
```


### components\Breadcrumb
> must add {} when impoort not default ==>import { pathToRegexp } from 'path-to-regexp'

## path:
> @ to ~ or "../"
> import components must use full name . ex. import Text from '~/components/SvgIcon' must be import Text from '~/components/SvgIcon/index.vue'

## settings.js
```javascript
module.exports = {
```
chnage to 
```javascript
export default {
```

## main.js:
> create and mount method changed

## route:
> create method changed

## store:
> create method changed

> require.context error: beacuse from webpack change to vite
參考<https://blog.csdn.net/m0_67402731/article/details/123216717>

```javascript
const modulesFiles = require.context('./modules', true, /\.js$/)
```
change to
```javascript
const modulesFiles = import.meta.globEager("./modules/*.js");

for(const key in modulesFiles){
    modules[key.replace(/(\.\/modules\/|\.js)/g,'')]= modulesFiles[key].default
}
```

### /store/modules/permission.js
> state routers:  can't asign constantRouterMap,must change to []

## components

### SvgIcon
> $listeners removed <https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html>


## /utils/request.js

> router import changed
> Notification changed to ElNotification

> vite .env.development changed
```javascript
//webpack
//--get env mode
process.env.NODE_ENV
//--get base api url
process.env.VUE_APP_BASE_API
```
```javascript
//vite
//--get env mode
import.meta.env.MODE
//--get base api url(note:should start with 'VITE_')
import.meta.env.VITE_VUE_APP_BASE_API


```

```javascript
// import router from '~/router/routers'
import router from '~/router'

import { ElNotification } from 'element-plus'
```