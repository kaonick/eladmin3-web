// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from 'vuex'
import getters from './getters'

// Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)


// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

const modulesFiles = import.meta.globEager("./modules/*.js");
// const modulesFiles = import.meta.glob('./modules/*.js')

console.log(modulesFiles)

const modules={}
for(const key in modulesFiles){
  console.log(key)
  console.log(key.replace('./modules/',''))
  // modulesFiles[key]().then(res=>{
  //   console.log(key.replace('./modules/',''))
  //   modules[key.replace(/(\.\/modules\/|\.js)/g,'')]=res.default
  // })

    modules[key.replace(/(\.\/modules\/|\.js)/g,'')]= modulesFiles[key].default
}
console.log(modules)
// Object.keys(modules).forEach(item=>{
//   modules[item]['namespaced']=true;
// })
// console.log('modules')
// console.log(modules)


const store = createStore({
  modules,
  getters
})

export default store
