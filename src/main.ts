import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// import { router } from './router'

import router from './router'
import store from './store'

import Cookies from 'js-cookie'

// Install the store instance as a plugin

import "~/styles/index.scss";


//svg
import svgIcon from "@/components/SvgIcon/index.vue";
import 'virtual:svg-icons-register'

// 引入fast-crud
import "./mock";
import {FastCrud} from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";
import ui from "@fast-crud/ui-element";
// import { FsExtendsUploader,FsExtendsEditor } from "@fast-crud/extends-uploader";
// import "@fast-crud/fast-extends/dist/style.css";


// import ids from 'virtual:svg-icons-names'
// => ['icon-icon1','icon-icon2','icon-icon3']
// import 'uno.css'
// createApp(App).use(router).mount('#app')
const app = createApp(App)

// console.log(ids,'ids')

app.use(router)
app.use(store)
app.use(ElementPlus,{
    size: Cookies.get('size') || 'small' // set element-ui default size
  })
// 先安装ui,然后安装FastCrud
app.use(ui); 
app.use(FastCrud)
//文件上传
// app.use(FsExtendsUploader, {
//   defaultType: "cos",
//   // 上传实现的配置，你使用哪一个就配置哪一个即可
//   cos: {},
//   alioss: {},
//   qiniu: {},
//   form: {},
// });
// //富文本编辑器
// app.use(FsExtendsEditor, {
//   //富文本编辑器的公共配置
//   wangEditor:{}
// });



app.component('svg-icon', svgIcon)
app.mount('#app')
