# vue2 to vue3 changelog:

## path:
> @ to ~ or "../"

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
```javascript
const modulesFiles = require.context('./modules', true, /\.js$/)
```
change to
```javascript
const modulesFiles = import.meta.glob('./modules/*.js')
const modules={}
for(const key in modulesFiles){
    modules[key.replace(/(\.\/modules\/|\.js)/g,'')]= modulesFiles[key]
}
Object.keys(modules).forEach(item=>{
  modules[item]['namespaced']=true;
})
```

### /store/modules/permission.js

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