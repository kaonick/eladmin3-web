import { createWebHistory, createRouter } from "vue-router";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

import Config from '../settings'

import { getToken } from '../utils/auth' // getToken from cookie
import { buildMenus } from '../api/system/menu'
import store from '~/store'
import { filterAsyncRouter } from '~/store/modules/permission'

import Home from "~/views/Home.vue";
import login from "~/views/login.vue";
import Layout from '~/layout/index.vue'

// export const constantRouterMap = [
//   {
//     path: "/",
//     // name: "home",
//     component: Home,
//   },
//   {
//     path: "/login",
//     // name: "login",
//     component: login,
//   },
// ];

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['~/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['~/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['~/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['~/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['~/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['~/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap,
});

NProgress.configure({ showSpinner: false })// NProgress Configuration
const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from,next) => {
  console.log('to:'+to.path)
    // do something...
    if (to.meta.title) {
        document.title = to.meta.title + ' - ' + Config.title
      }
      NProgress.start()
      if (getToken()) {
        // 已登录且要跳转的页面是登录页
        if (to.path === '/login') {
          next({ path: '/' })
          NProgress.done()
        } else {
          if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
            store.dispatch('GetInfo').then(() => { // 拉取user_info
              // 动态路由，拉取菜单
              loadMenus(next, to)
            }).catch(() => {
              store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            })
          // 登录时未拉取 菜单，在此处拉取
          } else if (store.getters.loadMenus) {
            // 修改成false，防止死循环
            store.dispatch('updateLoadMenus')
            loadMenus(next, to)
          } else {
            next()
          }
        }
      } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
          next()
        } else {
          next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
          NProgress.done()
        }
      }
});

export const loadMenus = (next, to) => {
  console.log('loadMenu')
    buildMenus().then(res => {
      const sdata = JSON.parse(JSON.stringify(res))
      const rdata = JSON.parse(JSON.stringify(res))
      const sidebarRoutes = filterAsyncRouter(sdata)
      const rewriteRoutes = filterAsyncRouter(rdata, false, true)
      rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
  
      store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
        console.log(rewriteRoutes)
        router.addRoute(rewriteRoutes) // 动态添加可访问路由表
        next({ ...to, replace: true })
      })
      store.dispatch('SetSidebarRouters', sidebarRoutes)
    })
  }
  
router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// let history = createWebHistory()
// let routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   }
// ]

// export default createRouter({ history, routes })
// export const router; 
export default router;
